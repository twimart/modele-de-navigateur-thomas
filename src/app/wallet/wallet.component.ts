import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  isWalletConnected = false;
  walletAddress: string | null = null;
  balance: number = 0;
  mnemonic: string = '';
  showMnemonic = false;

  // Pour l'envoi
  recipientAddress: string = '';
  sendAmount: number = 0;
  txSignature: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.loadExistingWallet();
  }

  loadExistingWallet() {
    const address = this.walletService.loadWallet();
    if (address) {
      this.walletAddress = address;
      this.isWalletConnected = true;
      this.refreshBalance();
    }
  }

  createNewWallet() {
    try {
      const wallet = this.walletService.createWallet();
      this.walletAddress = wallet.address;
      this.mnemonic = wallet.mnemonic;
      this.showMnemonic = true;
      this.isWalletConnected = true;
      this.refreshBalance();
    } catch (error) {
      this.errorMessage = `Erreur: ${error}`;
    }
  }

  importWallet() {
    try {
      this.walletAddress = this.walletService.importWallet(this.mnemonic);
      this.isWalletConnected = true;
      this.mnemonic = '';
      this.refreshBalance();
    } catch (error) {
      this.errorMessage = `Erreur: ${error}`;
    }
  }

  async refreshBalance() {
    this.isLoading = true;
    try {
      this.balance = await this.walletService.getBalance();
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = `Erreur lors de la récupération du solde: ${error}`;
    }
    this.isLoading = false;
  }

  async sendTokens() {
    if (!this.recipientAddress || this.sendAmount <= 0) {
      this.errorMessage = 'Adresse ou montant invalide';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.txSignature = '';

    try {
      const signature = await this.walletService.sendTransaction(
        this.recipientAddress,
        this.sendAmount
      );
      this.txSignature = signature;
      this.recipientAddress = '';
      this.sendAmount = 0;
      await this.refreshBalance();
    } catch (error) {
      this.errorMessage = `Erreur: ${error}`;
    }
    this.isLoading = false;
  }

  async requestAirdrop() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      await this.walletService.requestAirdrop();
      this.errorMessage = 'Airdrop demandé ! Rafraîchissement du solde...';
      setTimeout(() => this.refreshBalance(), 3000);
    } catch (error) {
      this.errorMessage = `Erreur airdrop: ${error}`;
    }
    this.isLoading = false;
  }

  disconnect() {
    this.walletService.disconnect();
    this.isWalletConnected = false;
    this.walletAddress = null;
    this.balance = 0;
  }

  copyAddress() {
    if (this.walletAddress) {
      navigator.clipboard.writeText(this.walletAddress);
    }
  }
}
