const MensagemAcerto = ({ msg, entrega }) => {
    return (
        <>
            <p className="alert alert-success">{msg}</p>
            <p>{entrega}</p>
        </>
    )
};

export default MensagemAcerto;
