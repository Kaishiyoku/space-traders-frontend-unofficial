import PropTypes from 'prop-types';
import {Link} from '@reach/router';
import {format, parseISO} from 'date-fns';
import LabelWithValueGroup from './base/LabelWithValueGroup';
import payOffLoanRequest from '../core/api/payOffLoanRequest';
import MultiLoadingButton from './base/button/MultiLoadingButton';
import formatInteger from '../core/formatInteger';

function ActiveLoans({loans, className}) {
    return (
        <div className={className}>
            <div className="text-xl pb-4">Active loans</div>

            <div className="mb-8">
                {loans.map((loan) => (
                    <div key={loan.id} className="mb-8">
                        <LabelWithValueGroup
                            entries={[
                                {label: 'Type', value: loan.type},
                                {label: 'Due', value: format(parseISO(loan.due), 'dd.MM.yyyy HH:mm')},
                                {label: 'Repayment amount', value: formatInteger(loan.repaymentAmount)},
                                {label: 'Status', value: loan.status},
                            ]}
                        />

                        <MultiLoadingButton label="Pay back loan" promiseFn={() => payOffLoanRequest(loan.id)} size="sm"/>
                    </div>
                ))}
            </div>

            <Link
                to="/loans/available"
                className="py-2 text-blue-600 cursor-pointer hover:text-blue-800 hover:underline dark:text-blue-500 dark:hover:text-white"
            >
                Show available loans
            </Link>
        </div>
    );
}

ActiveLoans.propTypes = {
    loans: PropTypes.array.isRequired,
};

ActiveLoans.defaultProps = {
    loans: [],
};

export default ActiveLoans;