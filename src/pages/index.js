import React, { useMemo, useState } from "react"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query {
    diagram: file(relativePath: { eq: "example.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

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
    return ""
  return (
    priceTable[Math.max(locations[loc1].zone, locations[loc2].zone)] *
    accountTypes[account].multiplier
  )
}

const IndexPage = ({ data }) => {
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        <p style={{ marginTop: "2rem" }}>
          The price from {loc1} to {loc2} for user type "{account}" is
        </p>
        <h1>{price ? `€${price}` : "error"}</h1>
        <p style={{ fontSize: "0.8rem", opacity: 0.66, marginTop: "2rem" }}>
          Price is calculated by using total number of zones travelled
          multiplied by the client's price bracket ("500" class multiplies the
          base price by 1.25)
        </p>
      </div>

      <div style={{ marginTop: "10%" }}>
        <Img fluid={data.diagram.childImageSharp.fluid} />
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
