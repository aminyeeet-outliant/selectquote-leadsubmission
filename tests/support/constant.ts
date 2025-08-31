import path from "path";

export const URLS = {
    HOMEPAGE: "https://stg-life-selectquote.outliant.com/",
    CONFIRMATION_FINAL_PAGE: "https://stg-life-selectquote.outliant.com/final-expenses/quote-form/confirmation-g",
    CONFIRM_QUOTE_PAGE: "https://stg-life-selectquote.outliant.com/quote-form/confirmation-g",
    API_FINAL_EXPENSE_QUOTE_FORM: "/api/postFinalExpenseQuoteForm",
    API_POST_QUOTE_FORM: 'api/postQuoteForm'
}

export const SELECTORS = {
    HOME: {
        BUTTON_GET_A_QUOTE: 'a[href="/quote-form"]',
        MOBILE_BURGER_ICON: 'div.burger-logo'
    },
    QOUTE_FORM: {
        MONTH: 'select[name="month"]',
        DAY: 'select[name="day"]',
        YEAR: 'input[name="year"]',
        BUTTON_NEXT: 'div.form-footer-next button:visible',
        COVERAGE_AMOUNT: 'select[name="life_desired_amount"]',
        ZIP_FIELD: 'input[name="zip"]',
        EMAIL_FIELD: 'input[name="email"]',
        FIRST_NAME_FIELD: 'input[name="First name"]',
        LAST_NAME_FIELD: 'input[name="Last name"]',
        PHONE_FIELD: 'input[name="Phone"]',
        HEIGHT_FT: 'input[name="life_height_ft"]',
        HEIGHT_INCHES: 'input[name="life_height_in"]',
        WEIGHT_FIELD: 'input[name="weight"]',
        COVERAGE_WITH_TERM: 'select[name="amount"]',
        TERM_FIELD: 'select[name="duration"]',
        ADDRESS_FIELD: 'input[aria-label="Address"]',
        REFERRAL_FIELD: 'select[name="referral"]',
        ACTIVITIES_LABEL_NO: 'label[for="engage_sports-1"]',
        HEREDITARY_LABEL_NO: 'label[for="hereditary_disease-1"]',
    },
    CONFIRMATION: {
        EMAIL_TEXT: 'span.user-email',
        PHONE_NUMBER_TEXT: 'a.scode-phone-number:visible'
    }
}

export const VIDEO_DIR = path.join(process.cwd(), "reports", "videos");
export const CSV_DIR = path.join(process.cwd(), "reports");
