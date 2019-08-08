import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
const UserItems = ({ user: { login, avatar_url, html_url } }) => {

    return (
        <div className="card text-center">
            <img
                src={avatar_url}
                alt="" className="round-img"
                style={{ width: '60px' }}
            />
            <h1>{login}</h1>
            <Link to={`/user/${login}`} className="btn btn-dark btn-sm sm-1">
                More
            </Link>
        </div>
    )
}

UserItems.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItems
