export default function Modal({ setModal, modal, id, task, setTask, addTask }) {
    const dn = modal ? "block" : "none";
    return (
        <div className="modal" style={{ display: dn }} onClick={setModal}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <div>
                    <h2>Zasah</h2>
                </div>
                <div className="w-100">
                    <input
                        id="HAH"
                        className="form-control"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Insert task"
                    />
                    <input type="hidden" value={id} />
                    <button className="btn btn-ptimary" onClick={addTask}>
                        +add
                    </button>
                    <hr />
                    <div>Modal</div>
                    <hr />
                </div>
                <div className="btn btn-light" onClick={setModal}>
                    Close
                </div>
            </div>
        </div >
    )
}