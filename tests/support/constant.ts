export const URLS = {
    HOMEPAGE: "https://stg-life-selectquote.outliant.com/"
}

export const SELECTORS = {
    HOME: {
        BUTTON_GET_A_QUOTE: 'a[href="/quote-form"]'
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
        EMAIL_TEXT: 'span.user-email'
    }
}
