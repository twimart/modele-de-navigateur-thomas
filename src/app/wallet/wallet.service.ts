import { Injectable } from '@angular/core';
import { Connection, Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private connection: Connection;
  private keypair: Keypair | null = null;
  private mnemonic: string | null = null;

  constructor() {
    // Connexion au réseau Solana Devnet (testnet)
    this.connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  }

  // Créer un nouveau portefeuille
  createWallet(): { address: string; mnemonic: string } {
    this.mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(this.mnemonic);
    const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
    this.keypair = Keypair.fromSeed(derivedSeed);

    // Sauvegarder dans localStorage (attention: pas sécurisé pour production!)
    localStorage.setItem('wallet_mnemonic', this.mnemonic);

    return {
      address: this.keypair.publicKey.toString(),
      mnemonic: this.mnemonic
    };
  }

  // Importer un portefeuille existant
  importWallet(mnemonic: string): string {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Phrase mnémonique invalide');
    }

    this.mnemonic = mnemonic;
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString('hex')).key;
    this.keypair = Keypair.fromSeed(derivedSeed);

    localStorage.setItem('wallet_mnemonic', mnemonic);

    return this.keypair.publicKey.toString();
  }

  // Charger le portefeuille depuis localStorage
  loadWallet(): string | null {
    const storedMnemonic = localStorage.getItem('wallet_mnemonic');
    if (storedMnemonic) {
      return this.importWallet(storedMnemonic);
    }
    return null;
  }

  // Obtenir l'adresse du portefeuille
  getAddress(): string | null {
    return this.keypair ? this.keypair.publicKey.toString() : null;
  }

  // Obtenir le solde en SOL
  async getBalance(): Promise<number> {
    if (!this.keypair) {
      throw new Error('Aucun portefeuille chargé');
    }

    const balance = await this.connection.getBalance(this.keypair.publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  // Envoyer des SOL
  async sendTransaction(toAddress: string, amount: number): Promise<string> {
    if (!this.keypair) {
      throw new Error('Aucun portefeuille chargé');
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.keypair.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amount * LAMPORTS_PER_SOL
        })
      );

      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [this.keypair]
      );

      return signature;
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi: ${error}`);
    }
  }

  // Demander un airdrop (uniquement sur devnet)
  async requestAirdrop(): Promise<string> {
    if (!this.keypair) {
      throw new Error('Aucun portefeuille chargé');
    }

    const signature = await this.connection.requestAirdrop(
      this.keypair.publicKey,
      1 * LAMPORTS_PER_SOL
    );

    await this.connection.confirmTransaction(signature);
    return signature;
  }

  // Déconnecter le portefeuille
  disconnect(): void {
    this.keypair = null;
    this.mnemonic = null;
    localStorage.removeItem('wallet_mnemonic');
  }
}
