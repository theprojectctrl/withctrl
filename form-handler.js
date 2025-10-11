// Form Handler for CTRL Community Submissions
class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormSubmission();
  }

  setupFormSubmission() {
    const form = document.getElementById('join-community-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form);
    const ventureType = formData.get('venture-type');
    
    // Prepare submission data
    const submissionData = this.prepareSubmissionData(formData, ventureType);
    
    try {
      // Show loading state
      this.showLoadingState();
      
      // Submit to appropriate endpoint based on venture type
      const endpoint = this.getSubmissionEndpoint(ventureType);
      const response = await this.submitToEndpoint(endpoint, submissionData);
      
      if (response.ok) {
        this.showSuccessMessage(ventureType);
        form.reset();
        this.hidePersonFields();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage();
    } finally {
      this.hideLoadingState();
    }
  }

  prepareSubmissionData(formData, ventureType) {
    const data = {
      'venture-type': ventureType,
      'email': formData.get('email'),
      'category': formData.get('category'),
      'description': formData.get('description'),
      'link': formData.get('link'),
      'niche': formData.get('niche'),
      'permission-ig': formData.get('permission-ig') === 'on',
      'permission-partnerships': formData.get('permission-partnerships') === 'on',
      'emoji': formData.get('emoji'),
      'submission-date': new Date().toISOString()
    };

    if (ventureType === 'person') {
      // Add person-specific fields
      data['person-name'] = formData.get('person-name');
      data['person-skills'] = formData.get('person-skills');
      // Use main form fields for description, niche, and link
      data['person-description'] = formData.get('description');
      data['person-niche'] = formData.get('niche');
      data['person-link'] = formData.get('link') || '';
      data['venture-name'] = 'N/A';
    } else {
      // Add venture-specific fields
      data['venture-name'] = formData.get('venture-name');
      data['venture-looking-for'] = formData.get('venture-looking-for') || '';
    }

    // Handle file uploads
    const files = formData.getAll('images[]');
    if (files && files.length > 0) {
      data['has-images'] = true;
      data['image-count'] = files.length;
    }

    return data;
  }

  getSubmissionEndpoint(ventureType) {
    // Use the same Basin endpoint for now, but we could have different endpoints
    return 'https://usebasin.com/f/264e81003939';
  }

  async submitToEndpoint(endpoint, data) {
    // Convert data to URL-encoded format for Basin
    const formData = new URLSearchParams();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });
  }

  showLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      submitButton.style.opacity = '0.7';
    }
  }

  hideLoadingState() {
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
      submitButton.style.opacity = '1';
    }
  }

  showSuccessMessage(ventureType) {
    const message = ventureType === 'person' 
      ? 'Thank you! Your profile has been submitted and will be reviewed. You\'ll be featured on our network page once approved.'
      : 'Thank you! Your venture has been submitted and will be reviewed. You\'ll be featured on our network page once approved.';
    
    alert(message);
  }

  showErrorMessage() {
    alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
  }

  hidePersonFields() {
    const personFields = document.getElementById('person-fields');
    if (personFields) {
      personFields.style.display = 'none';
    }
    
    // Reset venture name field
    const ventureNameField = document.getElementById('venture-name');
    const ventureNameLabel = ventureNameField.previousElementSibling;
    if (ventureNameField && ventureNameLabel) {
      ventureNameLabel.textContent = 'Venture Name *';
      ventureNameField.required = true;
      ventureNameField.placeholder = '';
      ventureNameField.style.display = 'block';
      ventureNameLabel.style.display = 'block';
    }
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
