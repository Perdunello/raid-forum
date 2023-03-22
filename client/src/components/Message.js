import {useSelector} from "react-redux";
import {normalize} from "../date/date";


const Message = ({message}) => {
    const authData = useSelector(state => state.login.authData)
    const date = new Date(message.date)
    const normalizeDate = normalize(date.getFullYear()) + ' ' + date.toLocaleString('en', {month: 'long'}).slice(0, 3) + ' ' + normalize(date.getDate())
    if (Number(authData.id) !== message.account_id) {//hear must be id
        return <div style={{display: 'flex', margin: '30px 0 30px 15px'}}>
            <div>
                <img style={{width: '50px', height: '50px', objectFit: 'cover'}}
                     src='/heroes/Siphi the Lost Bride/Siphi_the_Lost_Bride.png' width={50}
                     height={50} alt=""/></div>
            <div style={{marginLeft: '12px'}}>
                <div style={{display: 'flex'}}>
                    <div style={{color: 'white', fontSize: '17px'}}>{message.name}</div>
                    <div style={{fontSize: '14px', display: 'flex', lineHeight: '20px', marginLeft: '5px'}}>
                        <div>{message.time}</div>
                        <div style={{marginLeft: '5px', fontWeight: 'bold'}}>{normalizeDate}</div>
                    </div>
                </div>
                <div style={{textAlign: 'start', paddingTop: '12px'}}>{message.message}</div>
            </div>
        </div>
    } else {
        return <div style={{display: 'flex', margin: '30px 15px 30px 0', justifyContent: 'flex-end'}}>
            <div style={{marginRight: '12px'}}>
                <div style={{display: 'flex'}}>
                    <div style={{fontSize: '14px', display: 'flex', lineHeight: '20px', marginRight: '5px'}}>
                        <div style={{fontWeight: 'bold'}}>{normalizeDate}</div>
                        <div style={{marginLeft: '5px'}}>{message.time}</div>
                    </div>
                    <div style={{color: 'white', fontSize: '17px'}}>{message.name}</div>
                </div>
                <div style={{textAlign: 'end', paddingTop: '12px'}}>{message.message}</div>
            </div>
            <div>
                <img style={{width: '50px', height: '50px', objectFit: 'cover'}}
                     src='/heroes/Rotos-the-Lost-Groom/Rotos_the_Lost_Groom.png' width={50}
                     height={50} alt=""/>
            </div>
        </div>
    }
}
export default Message