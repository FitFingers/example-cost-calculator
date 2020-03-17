import React, { useMemo, useState } from "react"

import Layout from "../components/layout"

import moment from "moment-timezone"
import { func } from "prop-types"

const locations = {
  home: {
    zone: 1,
  },
  work: {
    zone: 1,
  },
  train: {
    zone: 2,
  },
  airport: {
    zone: 3,
  },
}

const priceTable = {
  1: 5,
  2: 12,
  3: 17,
}

const accountTypes = {
  "500": {
    multiplier: 1.25,
  },
  "1000": {
    multiplier: 1.1,
  },
  infinity: {
    multiplier: 1,
  },
}

const calculatePrice = (loc1, loc2, account) => {
  if (
    !loc1 ||
    !loc2 ||
    !account ||
    !locations[loc1] ||
    !locations[loc2] ||
    !accountTypes[account]
  )
    return "error"
  return (
    priceTable[Math.max(locations[loc1].zone, locations[loc2].zone)] *
    accountTypes[account].multiplier
  )
}

const IndexPage = () => {
  const [loc1, setloc1] = useState("")
  const [loc2, setloc2] = useState("")
  const [account, setaccount] = useState("")
  const price = useMemo(() => calculatePrice(loc1, loc2, account), [
    loc1,
    loc2,
    account,
  ])

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Display value={loc1} label="Pickup" update={setloc1} />
        <Display value={loc2} label="Dropoff" update={setloc2} />
        <Display value={account} label="User Account" update={setaccount} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          marginTop: "1rem",
          textAlign: "center",
          opacity: 0.66,
        }}
      >
        <div>
          <p>Locations (zone number):</p>
          {Object.keys(locations).map(k => (
            <p>
              {k}: {locations[k].zone}
            </p>
          ))}
        </div>

        <div>
          <p>Price Table:</p>
          {Object.keys(priceTable).map(k => (
            <p>
              {k} Zone{k > 1 && "s"}: €{priceTable[k]}
            </p>
          ))}
        </div>

        <div>
          <p>Account Types:</p>
          {Object.keys(accountTypes).map(k => (
            <p>
              {k}: x{accountTypes[k].multiplier}
            </p>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "1.2rem" }}>
        <p>
          The price from {loc1} to {loc2} for user type "{account}" is
        </p>
        <h1>{price}</h1>
      </div>
    </Layout>
  )
}

const Display = ({ value, label, update }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>
        <b>{label}: </b>
      </p>
      <input type="text" value={value} onChange={e => update(e.target.value)} />
    </div>
  )
}

export default IndexPage
