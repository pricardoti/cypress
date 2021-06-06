const locators = {
  MESSAGE: '.toast-message',
  LOGIN: {
    USER_EMAIL: '[data-test=email]',
    USER_PASSWORD: '[data-test=passwd]',
    ACTION_SUBMIT: '.btn.btn-block.btn-primary'
  },
  MENU: {
    SETTINGS: {
      CLICK: '[data-test=menu-settings]',
      OPTIONS: {
        ACCOUNT: '[href="/contas"]',
        RESET: '[href="/reset"]'
      }
    }
  },
  ACCOUNT: {
    NAME: '[data-test=nome]',
    ACTION_SUBMIT: '.btn.btn-primary.btn-block',
    XPATH_ROW_SAVE: '//table//td[contains(., "Conta de teste")]'
  }
};

export default locators;