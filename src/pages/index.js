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
  b2c: {
    1: 17,
    2: 11,
    3: 8,
  },
  "b2b.500": {
    1: 16,
    2: 10.5,
    3: 7.5,
  },
  "b2b.1000": {
    1: 15.5,
    2: 10,
    3: 7,
  },
  "b2b.infinity": {
    1: 15,
    2: 9.5,
    3: 7,
  },
}

const zones = {
  1: {
    multiplier: 1,
  },
  2: {
    multiplier: 1.1,
  },
  3: {
    multiplier: 1.25,
  },
}

const calculatePrice = (loc1, loc2, account, passengers) => {
  if (
    !loc1 ||
    !loc2 ||
    !account ||
    !locations[loc1] ||
    !locations[loc2] ||
    !priceTable[account]
  )
    return ""
  const { multiplier } = zones[
    Math.max(locations[loc1].zone, locations[loc2].zone)
  ]
  const baseCost = priceTable[account][passengers > 3 ? 3 : passengers]
  return (Math.round(baseCost * passengers * multiplier * 10) / 10).toFixed(2)
}

const IndexPage = ({ data }) => {
  const [loc1, setloc1] = useState("")
  const [loc2, setloc2] = useState("")
  const [account, setaccount] = useState("")
  const [passengers, setpassengers] = useState()
  const price = useMemo(() => calculatePrice(loc1, loc2, account, passengers), [
    loc1,
    loc2,
    account,
    passengers,
  ])

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Display
          value={loc1}
          label="Pickup"
          update={setloc1}
          helperText="Location name"
        />
        <Display
          value={loc2}
          label="Dropoff"
          update={setloc2}
          helperText="Location name"
        />
        <Display
          value={account}
          label="User Account"
          update={setaccount}
          helperText="Account (b2c, b2b.500, b2b.1000, b2b.infinity"
        />
        <Display
          value={passengers}
          label="Passengers"
          update={setpassengers}
          helperText="Number of Passengers"
        />
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
          <p>Locations (zone):</p>
          {Object.keys(locations).map(k => (
            <p>
              {k}: {locations[k].zone}
            </p>
          ))}
        </div>

        <div>
          <p>Zone Multipliers:</p>
          {Object.keys(zones).map(k => (
            <p>
              {k} zone{k > 1 && "s"}: x{zones[k].multiplier}
            </p>
          ))}
        </div>

        <div>
          <p>Passengers:</p>
          {Array.from({ length: 3 }).map((k, i) => (
            <p>{i + 1}</p>
          ))}
        </div>
      </div>

      <div style={{ opacity: 0.66, textAlign: "center" }}>
        <p>Price Table:</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <p>
            <b>b2c:</b>
            <br />
            1: €17,
            <br />
            2: €11,
            <br />
            3: €8,
          </p>
          <p>
            <b>b2b.500:</b>
            <br />
            1: 16,
            <br />
            2: 10.5,
            <br />
            3: 7.5,
            <br />
          </p>
          <p>
            <b>b2b.1000:</b>
            <br />
            1: 15.5,
            <br />
            2: 10,
            <br />
            3: 7,
            <br />
          </p>
          <p>
            <b>b2b.infinity:</b>
            <br />
            1: 15,
            <br />
            2: 9.5,
            <br />
            3: 7,
            <br />
          </p>
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
          The price from{" "}
          <em>
            <b>{loc1}</b>
          </em>{" "}
          to{" "}
          <em>
            <b>{loc2}</b>
          </em>{" "}
          with{" "}
          <em>
            <b>{passengers}</b>
          </em>{" "}
          passenger{passengers > 1 && "s"} for user type{" "}
          <em>
            <b>"{account}"</b>
          </em>{" "}
          is
        </p>
        <h1>{price ? `€${price}` : "error"}</h1>
        <p style={{ fontSize: "0.8rem", opacity: 0.66, marginTop: "2rem" }}>
          Price is calculated by using index of number of passengers and user
          account type to find base price. The price is then multiplied by the
          multiplier corresponding with the total number of zones travelled
        </p>
      </div>

      <div style={{ marginTop: "10%" }}>
        <Img fluid={data.diagram.childImageSharp.fluid} />
      </div>
    </Layout>
  )
}

const Display = ({ value, label, update, helperText }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>
        <b>{label}: </b>
      </p>
      <input
        type="text"
        value={value}
        onChange={e => update(e.target.value)}
        placeholder={helperText}
      />
    </div>
  )
}

export default IndexPage
