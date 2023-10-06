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
                data.payment = data.tax - data.contrib;
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
                data.payment = data.tax - data.contrib;
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
                data.payment = data.tax - data.contrib;
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
    }
};

Vue.createApp(Calc).mount('#calc');
