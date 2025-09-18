// Authentication System for CTRL
class AuthManager {
  constructor() {
    this.supabase = null;
    this.user = null;
    this.isInitialized = false;
    this.init();
  }

  async init() {
    // Initialize Supabase client
    this.supabase = supabase.createClient(
      'YOUR_SUPABASE_URL', // Replace with your Supabase URL
      'YOUR_SUPABASE_ANON_KEY' // Replace with your Supabase anon key
    );

    // Check for existing session
    const { data: { session } } = await this.supabase.auth.getSession();
    if (session) {
      this.user = session.user;
      this.updateUI();
    }

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.user = session.user;
        this.updateUI();
        this.closeAuthModal();
        this.showSuccessMessage('Welcome to CTRL!');
      } else if (event === 'SIGNED_OUT') {
        this.user = null;
        this.updateUI();
        this.showSuccessMessage('You have been signed out');
      }
    });

    this.isInitialized = true;
  }

  // Show authentication modal
  showAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) {
      this.createAuthModal();
    }
    
    const modalElement = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authTabs = document.querySelectorAll('.auth-tab');
    
    if (mode === 'login') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      authTabs[0].classList.add('active');
      authTabs[1].classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      authTabs[0].classList.remove('active');
      authTabs[1].classList.add('active');
    }
    
    modalElement.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Close authentication modal
  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Create authentication modal HTML
  createAuthModal() {
    const modalHTML = `
      <div id="auth-modal" class="auth-modal" style="display: none;">
        <div class="auth-modal-content">
          <button class="auth-close-btn" onclick="authManager.closeAuthModal()">×</button>
          
          <div class="auth-header">
            <img src="favicon.png" alt="CTRL" style="width: 40px; height: 40px; margin-bottom: 1rem;">
            <h2>Welcome to CTRL</h2>
            <p>Join our community of creators and innovators</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab active" onclick="authManager.showAuthModal('login')">Sign In</button>
            <button class="auth-tab" onclick="authManager.showAuthModal('signup')">Sign Up</button>
          </div>

          <!-- Login Form -->
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" required>
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" id="login-password" required>
            </div>
            <button type="submit" class="auth-submit-btn">Sign In</button>
            <div class="auth-divider">
              <span>or</span>
            </div>
            <button type="button" class="auth-google-btn" onclick="authManager.signInWithGoogle()">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <!-- Signup Form -->
          <form id="signup-form" class="auth-form" style="display: none;">
            <div class="form-group">
              <label for="signup-name">Full Name</label>
              <input type="text" id="signup-name" required>
            </div>
            <div class="form-group">
              <label for="signup-email">Email</label>
              <input type="email" id="signup-email" required>
            </div>
            <div class="form-group">
              <label for="signup-password">Password</label>
              <input type="password" id="signup-password" required minlength="6">
            </div>
            <div class="form-group">
              <label for="signup-venture">Venture Name (Optional)</label>
              <input type="text" id="signup-venture" placeholder="Your business or project name">
            </div>
            <button type="submit" class="auth-submit-btn">Create Account</button>
            <div class="auth-divider">
              <span>or</span>
            </div>
            <button type="button" class="auth-google-btn" onclick="authManager.signUpWithGoogle()">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <div class="auth-footer">
            <p>By continuing, you agree to our <a href="#" onclick="event.preventDefault()">Terms of Service</a> and <a href="#" onclick="event.preventDefault()">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.setupAuthEventListeners();
  }

  // Setup event listeners for auth forms
  setupAuthEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        const { error } = await this.supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
      } catch (error) {
        this.showErrorMessage(error.message);
      }
    });

    // Signup form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const name = document.getElementById('signup-name').value;
      const venture = document.getElementById('signup-venture').value;
      
      try {
        const { data, error } = await this.supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              venture_name: venture
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user && !data.user.email_confirmed_at) {
          this.showSuccessMessage('Please check your email to confirm your account');
        }
      } catch (error) {
        this.showErrorMessage(error.message);
      }
    });
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error) {
      this.showErrorMessage(error.message);
    }
  }

  // Sign up with Google
  async signUpWithGoogle() {
    try {
      const { error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error) {
      this.showErrorMessage(error.message);
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      this.showErrorMessage(error.message);
    }
  }

  // Update UI based on auth state
  updateUI() {
    const authButtons = document.querySelectorAll('.auth-button');
    const userMenu = document.querySelector('.user-menu');
    
    if (this.user) {
      // User is signed in
      authButtons.forEach(btn => {
        btn.style.display = 'none';
      });
      
      if (userMenu) {
        userMenu.style.display = 'block';
        const userName = userMenu.querySelector('.user-name');
        const userAvatar = userMenu.querySelector('.user-avatar');
        
        if (userName) {
          userName.textContent = this.user.user_metadata?.full_name || this.user.email;
        }
        
        if (userAvatar) {
          userAvatar.textContent = (this.user.user_metadata?.full_name || this.user.email).charAt(0).toUpperCase();
        }
      }
    } else {
      // User is signed out
      authButtons.forEach(btn => {
        btn.style.display = 'block';
      });
      
      if (userMenu) {
        userMenu.style.display = 'none';
      }
    }
  }

  // Show success message
  showSuccessMessage(message) {
    this.showMessage(message, 'success');
  }

  // Show error message
  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  // Show message
  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message auth-message-${type}`;
    messageDiv.textContent = message;
    
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.querySelector('.auth-modal-content').appendChild(messageDiv);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }
}

// Initialize auth manager
const authManager = new AuthManager();

// Make it globally available
window.authManager = authManager;
