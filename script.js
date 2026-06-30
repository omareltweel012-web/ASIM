// تطبيق المحفظة الرقمية

class WalletApp {
    constructor() {
        this.userData = this.loadUserData();
        this.currentPage = 'register';
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        if (this.userData) {
            this.showPage('wallet');
        }
    }

    cacheElements() {
        // Pages
        this.registerPage = document.getElementById('registerPage');
        this.walletPage = document.getElementById('walletPage');
        this.withdrawDataPage = document.getElementById('withdrawDataPage');
        this.withdrawConfirmPage = document.getElementById('withdrawConfirmPage');

        // Register Form
        this.registerForm = document.getElementById('registerForm');

        // Wallet Elements
        this.displayName = document.getElementById('displayName');
        this.displayPhone = document.getElementById('displayPhone');
        this.displayBalance = document.getElementById('displayBalance');
        this.withdrawBtn = document.querySelectorAll('.withdraw-btn');

        // Withdraw Form
        this.withdrawForm = document.getElementById('withdrawForm');
        this.withdrawName = document.getElementById('withdrawName');
        this.withdrawUserId = document.getElementById('withdrawUserId');
        this.withdrawBalance = document.getElementById('withdrawBalance');
        this.withdrawTax = document.getElementById('withdrawTax');

        // Confirm Page
        this.confirmBtn = document.querySelector('.confirm-btn');
        this.confirmTransferNum = document.getElementById('confirmTransferNum');
    }

    bindEvents() {
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        this.withdrawBtn.forEach(btn => {
            btn.addEventListener('click', () => this.showPage('withdrawData'));
        });
        this.withdrawForm.addEventListener('submit', (e) => this.handleWithdrawSubmit(e));
        this.confirmBtn?.addEventListener('click', () => this.handleConfirm());

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => this.goBack());
        });

        // Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabClick(e));
        });
    }

    handleRegister(e) {
        e.preventDefault();
        const userData = {
            fullName: document.getElementById('fullName').value,
            balance: parseFloat(document.getElementById('balance').value),
            transferNumber: document.getElementById('transferNumber').value,
            tax: parseFloat(document.getElementById('tax').value),
            paymentMethod: document.getElementById('paymentMethod').value,
            userId: document.getElementById('userId').value,
            phone: '0' + Math.floor(Math.random() * 9000000000 + 1000000000),
        };

        this.userData = userData;
        this.saveUserData();
        this.updateWalletDisplay();
        this.showPage('wallet');
    }

    updateWalletDisplay() {
        if (this.userData) {
            this.displayName.textContent = this.userData.fullName;
            this.displayPhone.textContent = this.userData.phone;
            this.displayBalance.textContent = '£' + this.userData.balance.toFixed(2);
        }
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        switch (pageName) {
            case 'register':
                this.registerPage.classList.add('active');
                break;
            case 'wallet':
                this.walletPage.classList.add('active');
                this.updateWalletDisplay();
                break;
            case 'withdrawData':
                this.withdrawDataPage.classList.add('active');
                this.updateWithdrawForm();
                break;
            case 'withdrawConfirm':
                this.withdrawConfirmPage.classList.add('active');
                break;
        }
        this.currentPage = pageName;
    }

    updateWithdrawForm() {
        if (this.userData) {
            this.withdrawName.textContent = this.userData.fullName.split(' ')[0];
            this.withdrawUserId.textContent = this.userData.phone;
            this.withdrawBalance.textContent = this.userData.balance.toFixed(2);
            this.withdrawTax.textContent = this.userData.tax.toFixed(2);
        }
    }

    handleWithdrawSubmit(e) {
        e.preventDefault();
        this.showPage('withdrawConfirm');
    }

    handleConfirm() {
        alert('✅ تم تأكيد طلب السحب بنجاح!\nسيتم معالجة طلبك في أقرب وقت.');
        this.showPage('wallet');
    }

    goBack() {
        if (this.currentPage === 'withdrawData') {
            this.showPage('wallet');
        } else if (this.currentPage === 'withdrawConfirm') {
            this.showPage('withdrawData');
        }
    }

    handleTabClick(e) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
    }

    saveUserData() {
        localStorage.setItem('walletUserData', JSON.stringify(this.userData));
    }

    loadUserData() {
        const stored = localStorage.getItem('walletUserData');
        return stored ? JSON.parse(stored) : null;
    }
}

// Initialize app
const walletApp = new WalletApp();