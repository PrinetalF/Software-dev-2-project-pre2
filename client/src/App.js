import logo from './logo.svg';
import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';

function App() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      },
      'end': {
        'dateTime': end.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("สร้างกิจกรรมแล้ว! ตรวจสอบได้ใน Google Calendar");
    });
  }

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);
  return (
    <div className="App">
      <div style={{width: "400px", margin: "30px auto"}}>
        {session ?
          <>
            <h2>สวัสดีผู้ใช้{session.user.email}</h2>
            <p>ชื่อกิจกรรม</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>คำอธิบายกิจกรรม</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <p>เริ่มกิจกรรม</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>สิ้นสุดกิจกรรม</p>
            <DateTimePicker onChange={setEnd} value={end} />
            
            
            <hr />
            <button onClick={() => createCalendarEvent()}>สร้างกิจกรรม</button>
            <p></p>
            <button onClick={() => signOut()}>ลงชื่อออก</button>
          </>
          :
          <>
            <button onClick={() => googleSignIn()}>ลงชื่อเข้าใช้ด้วย Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;

