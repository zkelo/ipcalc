const Calc = {
    data() {
        return {
            percent: 6,
            contribs: 45842,
            firstQuarter: {
                income: 0,
                contrib: 0
            },
            secondQuarter: {
                income: 0,
                contrib: 0
            },
            thirdQuarter: {
                income: 0,
                contrib: 0
            },
            fourthQuarter: {
                income: 0,
                contrib: 0
            }
        };
    },
    methods: {
        evenlyContribs() {
            const quarterContrib = this.contribs / 4;

            this.firstQuarter.contrib = quarterContrib;
            this.secondQuarter.contrib = quarterContrib;
            this.thirdQuarter.contrib = quarterContrib;
            this.fourthQuarter.contrib = quarterContrib;
        },
        formatNumber(number) {
            return new Intl.NumberFormat().format(number);
        }
    },
    computed: {
        /* Ставка */
        rate() {
            return this.percent / 100;
        },
        /* Взносы */
        // 1 квартал
        firstQuarterContribs() {
            if (this.firstQuarter.contrib > this.contribs) {
                return this.contribs;
            }
            return this.firstQuarter.contrib;
        },
        // 2 квартал
        secondQuarterContribs() {
            if (this.secondQuarter.contrib > this.contribs) {
                return this.contribs;
            }
            return this.secondQuarter.contrib;
        },
        // 3 квартал
        thirdQuarterContribs() {
            if (this.thirdQuarter.contrib > this.contribs) {
                return this.contribs;
            }
            return this.thirdQuarter.contrib;
        },
        // 4 квартал
        fourthQuarterContribs() {
            if (this.fourthQuarter.contrib > this.contribs) {
                return this.contribs;
            }
            return this.fourthQuarter.contrib;
        },
        /* 3 месяца */
        threeMonths() {
            const data = {
                income: this.firstQuarter.income,
                contrib: this.firstQuarterContribs,
                tax: this.firstQuarter.income * this.rate,
                payment: 0
            };

            if (data.contrib < data.tax) {
                data.payment = data.tax - data.contrib;
            }
            return data;
        },
        /* 6 месяцев */
        sixMonths() {
            const data = {
                income: this.threeMonths.income + this.secondQuarter.income,
                contrib: this.threeMonths.contrib + this.secondQuarterContribs,
                tax: (this.threeMonths.income + this.secondQuarter.income) * this.rate,
                payment: 0
            };

            if (data.contrib < data.tax) {
                data.payment = data.tax - data.contrib - this.threeMonths.payment;
            }
            return data;
        },
        /* 9 месяцев */
        nineMonths() {
            const data = {
                income: this.sixMonths.income + this.thirdQuarter.income,
                contrib: this.sixMonths.contrib + this.thirdQuarterContribs,
                tax: (this.sixMonths.income + this.thirdQuarter.income) * this.rate,
                payment: 0
            };

            if (data.contrib < data.tax) {
                data.payment = data.tax - data.contrib - this.sixMonths.payment;
            }
            return data;
        },
        /* Год */
        year() {
            const data = {
                income: this.nineMonths.income + this.fourthQuarter.income,
                contrib: this.nineMonths.contrib + this.fourthQuarterContribs,
                tax: (this.nineMonths.income + this.fourthQuarter.income) * this.rate,
                payment: 0
            };

            if (data.contrib < data.tax) {
                data.payment = data.tax - data.contrib - this.nineMonths.payment;
            }
            return data;
        },
        // Доход свыше 300 тыс. руб.
        incomeAbove() {
            if (this.year.income <= 300_000) {
                return 0;
            }
            return this.year.income - 300_000;
        },
        // 1% свыше 300 тыс. руб.
        onePercentAbove() {
            return this.incomeAbove * 0.01;
        }
    },
    watch: {
        firstQuarter: {
            handler(data) {
                localStorage.setItem('firstQuarter_income', data.income);
                localStorage.setItem('firstQuarter_contrib', data.contrib);
            },
            deep: true
        },
        secondQuarter: {
            handler(data) {
                localStorage.setItem('secondQuarter_income', data.income);
                localStorage.setItem('secondQuarter_contrib', data.contrib);
            },
            deep: true
        },
        thirdQuarter: {
            handler(data) {
                localStorage.setItem('thirdQuarter_income', data.income);
                localStorage.setItem('thirdQuarter_contrib', data.contrib);
            },
            deep: true
        },
        fourthQuarter: {
            handler(data) {
                localStorage.setItem('fourthQuarter_income', data.income);
                localStorage.setItem('fourthQuarter_contrib', data.contrib);
            },
            deep: true
        }
    },
    mounted() {
        this.firstQuarter.income = +localStorage.getItem('firstQuarter_income') || 0;
        this.firstQuarter.contrib = +localStorage.getItem('firstQuarter_contrib') || 0;

        this.secondQuarter.income = +localStorage.getItem('secondQuarter_income') || 0;
        this.secondQuarter.contrib = +localStorage.getItem('secondQuarter_contrib') || 0;

        this.thirdQuarter.income = +localStorage.getItem('thirdQuarter_income') || 0;
        this.thirdQuarter.contrib = +localStorage.getItem('thirdQuarter_contrib') || 0;

        this.fourthQuarter.income = +localStorage.getItem('fourthQuarter_income') || 0;
        this.fourthQuarter.contrib = +localStorage.getItem('fourthQuarter_contrib') || 0;
    }
};

Vue.createApp(Calc).mount('#calc');
