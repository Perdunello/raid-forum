import {io} from "socket.io-client";
import {useEffect} from "react";
import styles from '../styles/Forum.module.scss'
import {addMessageRequest, getMessagesRequest, setMessages} from "../redux/ForumReducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Messages from "./Messages";
import {normalize} from "../date/date";

const socket = io("http://localhost:3001/forum");

const Forum = () => {
    const isAuth = useSelector(state => state.login.isAuth)
    const authData = useSelector(state => state.login.authData)
    const messages = useSelector(state => state.forum.messages)
    const dispatch = useDispatch()
    const date = new Date()

    useEffect(() => {
        if (isAuth) {
            dispatch(getMessagesRequest(socket))
            socket.on('connection', () => {
                socket.on("disconnect", () => {
                    return authData.name
                })
            })
            socket.on('get-messages', (data) => {
                dispatch(setMessages(data))
            })
            return () => {
                socket.off('connection');
                socket.off('disconnect');
                socket.off('get-messages')
            }
        }
    }, [])

    const checkKeyUp = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) {
            e.target.value = e.target.value + '\n'
        } else if (e.keyCode === 13) {


            socket.emit('add-message', {
                userId: authData.id,
                message: e.target.value.slice(0, e.target.value.length - 1),
                time: normalize(date.getHours()) + ':' + normalize(date.getMinutes()) + ':' + normalize(date.getSeconds()),
                date: date.getFullYear() + '.' + normalize(date.getMonth() + 1) + '.' + normalize(date.getDate()),
            })
            dispatch(addMessageRequest(authData.name, e.target.value, date.getHours() + ':' + date.getMinutes(),
                date.getDate() + ' ' + date.toLocaleString('en', {month: 'long'}).slice(0, 3) + ' ' + date.getFullYear()))
            e.target.value = ''
        }
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return <div className={styles.main}>
        <div className={styles.messagesWrapper}>
            <Messages messages={messages}/>
        </div>
        <div className={styles.newMessageWrapper}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img className={styles.avatar} width={70} height={70}
                     src="/heroes/Rotos-the-Lost-Groom/Rotos_the_Lost_Groom.png" alt=""/>
            </div>
            <div>
                <textarea onKeyUp={checkKeyUp} className={styles.textarea} type="text"
                          placeholder={'Enter your message'}/>
            </div>
        </div>
    </div>
}
export default Forum