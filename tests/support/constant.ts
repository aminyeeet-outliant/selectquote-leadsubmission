import path from "path";

export const URLS = {
    HOMEPAGE: "https://stg-life-selectquote.outliant.com/",
    CONFIRMATION_PAGE: "https://stg-life-selectquote.outliant.com/final-expenses/quote-form/confirmation-g",
    API_FINAL_EXPENSE_QUOTE_FORM: "/api/postFinalExpenseQuoteForm",
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
        PHONE_FIELD: 'input[name="Phone"]'
    },
    CONFIRMATION: {
        EMAIL_TEXT: 'span.user-email',
        PHONE_NUMBER_TEXT: 'a.scode-phone-number'
    }
}

export const VIDEO_DIR = path.join(process.cwd(), "reports", "videos");
export const CSV_DIR = path.join(process.cwd(), "reports");
