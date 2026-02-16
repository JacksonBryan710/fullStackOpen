const Notification = ({ message, type }) => {
    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }


    if (message === null) {
        return null;
    }

    return (
        <div className="notification" style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;