import '../../style/profile.css'

export function CreateModal({ imgModal, modalToClose }) {
    console.log("c'est la mort" + imgModal)
    return (
        <>
            <div className="gallery-modal">
                <div className="modal-image-pos">
                    <span className="close-modal" onClick={modalToClose}> x</span>
                    <img src={imgModal} alt={imgModal} />
                </div>
            </div>
        </>
    )
}