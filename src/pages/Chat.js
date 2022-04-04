import { useState, useEffect } from 'react'
import { auth, db } from '../services/firebase';
import { ref, onValue, set } from 'firebase/database'

export default function Chat() {

    const [user, setUser] = useState(auth.currentUser)
    const [chats, setChats] = useState([])
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)
    const [writeError, setWriteError] = useState(null)
    const [loadingChats, setLoadingChats] = useState(false)

    function getChats() {
        setError(null)
        try {
            const startCountRef = ref(db, 'chats')
            onValue(startCountRef, (snapshot) => {
                const data = snapshot.val()
                setChats(data)
            })
        } catch (error) {
            setContent(error.target.value)
        }
    }

    const handleOnChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!content) {
            return
        } setWriteError(null)

        try {
            set(ref(db, 'chats/' + Date.now()), {
                content: content,
                timestamp: Date.now,
                uid: user.uid
            })
            setContent("")
        } catch (e) {
            setWriteError(e.message)
        }
    }

    useEffect(() => {
        getChats()
    }, [])


    return (
        <div div className="chat">
            <div className="chat-area">
                {loadingChats ? (
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading chat...</span>
                    </div>
                ) : (
                    ""
                )}
                {/* chat area */}
                {chats.map((chat) => {
                    return (
                        <p key={chat.timestamp}
                            className={
                                "chat-bubble " +
                                (user.uid === chat.uid ? "current-user" : "")
                            }
                        >
                            <br />
                            {chat.content}
                            <br />
                            <span className="chat-time float-right">
                                {this.formatTime(chat.timestamp)}
                            </span>
                        </p>
                    );
                })}
            </div><div className="py-5 mx-3">
                Login in as:{" "}
                <strong className="text-info">{user.email}</strong>
            </div>
            <form onSubmit={handleSubmit} className="mx-3">
                <textarea className="form-control" name="content" onChange={handleOnChange} value={content}></textarea>
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : null}
                <button className="btn btn-primary px-3 mt-2" type="submit">
                    Enviar
                </button>
            </form>

        </div>
    );
}
