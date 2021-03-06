import {useEffect, useState} from 'react';
import availableLoansRequest from '../core/api_requests/loans/availableLoansRequest';
import takeOutLoanRequest from '../core/api_requests/loans/takeOutLoanRequest';
import LabelWithValueGroup from '../components/base/LabelWithValueGroup';
import formatBool from '../core/formatters/formatBool';
import MultiLoadingButton from '../components/base/button/MultiLoadingButton';
import formatInteger from '../core/formatters/formatInteger';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardFooter from '../components/Card/CardFooter';
import {toast} from 'react-toastify';
import pascalCaseToWordsAndUpperCaseFirstChar from '../core/formatters/pascalCaseToWordsAndUpperCaseFirstChar';
import Heading from '../components/base/Heading';

function AvailableLoans() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        availableLoansRequest().then(({data}) => setLoans(data.loans));
    }, []);

    return (
        <>
            <Heading label="Available loans"/>

            {loans.map((loan) => (
                <Card key={loan.type} headingLabel={pascalCaseToWordsAndUpperCaseFirstChar(loan.type)}>
                    <CardBody>
                        <LabelWithValueGroup entries={[
                            {label: 'Amount', value: formatInteger(loan.amount)},
                            {label: 'Collateral required', value: formatBool(loan.collateralRequired)},
                            {label: 'Rate', value: formatInteger(loan.rate)},
                            {label: 'Term (days)', value: loan.termInDays},
                        ]}/>
                    </CardBody>

                    <CardFooter>
                        <MultiLoadingButton
                            label="Take out loan"
                            promiseFn={() => takeOutLoanRequest(loan.type)}
                            onSuccess={() => toast.success('Loan taken out.')}
                        />
                    </CardFooter>
                </Card>
            ))}
        </>
    );
}

export default AvailableLoans;