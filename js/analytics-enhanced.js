/**
 * Enhanced Google Analytics Tracking for CTRL Website
 * Measurement ID: G-REKT5H0GXW
 */

// Enhanced Analytics Functions
const CTRLAnalytics = {
  
  // Initialize enhanced tracking
  init: function() {
    this.trackFormSubmissions();
    this.trackButtonClicks();
    this.trackExternalLinks();
    this.trackScrollDepth();
    this.trackTimeOnPage();
    console.log('CTRL Analytics Enhanced Tracking Initialized');
  },

  // Track form submissions
  trackFormSubmissions: function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const formId = form.id || 'unknown_form';
        const formAction = form.action || 'unknown_action';
        
        gtag('event', 'form_submit', {
          'event_category': 'engagement',
          'event_label': formId,
          'form_action': formAction,
          'page_location': window.location.href
        });
        
        console.log(`Form submission tracked: ${formId}`);
      });
    });
  },

  // Track button clicks
  trackButtonClicks: function() {
    const buttons = document.querySelectorAll('button, .button, .btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const buttonText = button.textContent.trim() || 'unknown_button';
        const buttonClass = button.className || 'no_class';
        
        gtag('event', 'click', {
          'event_category': 'engagement',
          'event_label': buttonText,
          'button_class': buttonClass,
          'page_location': window.location.href
        });
        
        console.log(`Button click tracked: ${buttonText}`);
      });
    });
  },

  // Track external link clicks
  trackExternalLinks: function() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.addEventListener('click', function(e) {
          gtag('event', 'click', {
            'event_category': 'engagement',
            'event_label': 'external_link',
            'link_url': link.href,
            'link_text': link.textContent.trim(),
            'page_location': window.location.href
          });
          
          console.log(`External link click tracked: ${link.href}`);
        });
      }
    });
  },

  // Track scroll depth
  trackScrollDepth: function() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90];
    const trackedThresholds = new Set();

    window.addEventListener('scroll', function() {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            
            gtag('event', 'scroll', {
              'event_category': 'engagement',
              'event_label': `scroll_${threshold}_percent`,
              'scroll_depth': threshold,
              'page_location': window.location.href
            });
            
            console.log(`Scroll depth tracked: ${threshold}%`);
          }
        });
      }
    });
  },

  // Track time on page
  trackTimeOnPage: function() {
    const startTime = Date.now();
    const timeThresholds = [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
    const trackedTimes = new Set();

    setInterval(function() {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      timeThresholds.forEach(threshold => {
        if (timeOnPage >= threshold && !trackedTimes.has(threshold)) {
          trackedTimes.add(threshold);
          
          gtag('event', 'timing_complete', {
            'name': 'time_on_page',
            'value': threshold,
            'event_category': 'engagement',
            'event_label': `time_${threshold}_seconds`,
            'page_location': window.location.href
          });
          
          console.log(`Time on page tracked: ${threshold} seconds`);
        }
      });
    }, 1000);
  },

  // Track specific events manually
  trackEvent: function(category, action, label, value) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value,
      'page_location': window.location.href
    });
    
    console.log(`Custom event tracked: ${category} - ${action} - ${label}`);
  },

  // Track page views with custom parameters
  trackPageView: function(customParams = {}) {
    gtag('config', 'G-08H0KSCE2S', {
      'page_title': document.title,
      'page_location': window.location.href,
      'custom_map': customParams
    });
    
    console.log('Page view tracked with custom parameters');
  },

  // Track user engagement with content
  trackContentEngagement: function(contentType, contentId, contentTitle) {
    gtag('event', 'content_view', {
      'event_category': 'content',
      'event_label': contentType,
      'content_type': contentType,
      'content_id': contentId,
      'content_title': contentTitle,
      'page_location': window.location.href
    });
    
    console.log(`Content engagement tracked: ${contentType} - ${contentTitle}`);
  },

  // Track search queries
  trackSearch: function(searchTerm, resultsCount) {
    gtag('event', 'search', {
      'search_term': searchTerm,
      'results_count': resultsCount,
      'page_location': window.location.href
    });
    
    console.log(`Search tracked: ${searchTerm} (${resultsCount} results)`);
  },

  // Track file downloads
  trackDownload: function(fileName, fileType, fileSize) {
    gtag('event', 'download', {
      'event_category': 'engagement',
      'event_label': fileName,
      'file_name': fileName,
      'file_type': fileType,
      'file_size': fileSize,
      'page_location': window.location.href
    });
    
    console.log(`Download tracked: ${fileName}`);
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    CTRLAnalytics.init();
  });
} else {
  CTRLAnalytics.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CTRLAnalytics;
} else if (typeof window !== 'undefined') {
  window.CTRLAnalytics = CTRLAnalytics;
}

// Usage Examples:
/*
// Track a custom button click
document.getElementById('special-button').addEventListener('click', function() {
  CTRLAnalytics.trackEvent('engagement', 'click', 'special_button_click', 1);
});

// Track content engagement
CTRLAnalytics.trackContentEngagement('project', 'proj_123', 'Amazing Project');

// Track search
CTRLAnalytics.trackSearch('technology projects', 15);

// Track download
CTRLAnalytics.trackDownload('project-guide.pdf', 'pdf', '2.5MB');
*/
