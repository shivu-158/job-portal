import React, { useState } from "react";
import { useJobStore } from "../store/jobStore";
import { Page } from "./shared";
export default function ExperimentG6(){const profile=useJobStore(s=>s.profile), update=useJobStore(s=>s.updateProfile);const [name,setName]=useState(profile.name),[email,setEmail]=useState(profile.email),[location,setLocation]=useState(profile.location);
return <Page letter="G" title="Update Profile" 
             aim="Store profile information globally so it is available on every page." 
             algorithm={["Read the current profile.","Allow the user to edit name, email and location.","Update the global profile state on submit.","Persist profile data in localStorage."]}>
                <form className="exp6-form vertical" onSubmit={e=>{e.preventDefault();update({name,email,location});alert("Profile updated")}}>
                    <label className="exp6-label">Name
                        <input className="exp6-input" value={name} onChange={e=>setName(e.target.value)} required />
                    </label>
                    <label className="exp6-label">Email
                        <input className="exp6-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                    </label>
                    <label className="exp6-label">Location
                        <input className="exp6-input" value={location} onChange={e=>setLocation(e.target.value)} required />
                    </label>
                    <button className="exp6-btn">Save profile</button>
                </form>
                    <p>Current profile: <b>{profile.name}</b> · {profile.email} · {profile.location}</p>
                    </Page>
                    }
