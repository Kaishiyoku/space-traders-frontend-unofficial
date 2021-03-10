import LabelWithValue from './LabelWithValue';
import PropTypes from 'prop-types';
import formatNumber from '../core/formatNumber';

function UserInfo(props) {
    if (!props.user) {
        return <div/>;
    }

    return (
        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 bg-white mb-8 dark:border-gray-700 dark:bg-gray-800">
            <div className="px-6 py-4">
                <LabelWithValue label="User name" value={props.user.username} showBackgrounds={false}/>
                <LabelWithValue label="Credits" value={formatNumber(props.user.credits)} showBackgrounds={false}/>
            </div>
        </div>
    );
}

UserInfo.propTypes = {
    user: PropTypes.any.isRequired,
};

export default UserInfo;