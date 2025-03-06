import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'

function App() {
  const tableHeaders = {
    human_user: "Human User",
    create_date: "Create Date",
    password_changed_date: "Password Chaged Date",
    days_since_last_password_change: "Days since last password change",
    last_access_date: "Last Access Date",
    days_since_last_access: "Days since Last Access",
    mfa_enabled: "MFA Enabled"
  }

  return (
    <>
      <Table />
    </>
  )
}

export default App
