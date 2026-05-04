import img1 from "./IMG_0429-001.JPG"
import bg from "./background photo.avif"
import { useState } from "react"

import "./App.css"

function Top(x){
  return(
    <div
      style={{
        backgroundImage: `url(${bg})`,
        minHeight: "100vh",
        backgroundSize: "cover"
      }}
    >




      <h1>{x.title} </h1>
      <img src={img1} alt="park photo" width="300" ></img>
      <p>{x.desc} </p>

      <div>
        <div>visited: {x.count}</div>
        <div>favorite: {x.fav || "none"}</div>
      </div>

      <hr/>

    </div>
  )
}

// functi


function Options({ word, setWord, sort, setSort, only, setOnly }) {
  const handleSearchChange = (e) => setWord(e.target.value)
  const handleSortChange = (e) => setSort(e.target.value)
  const handleOnlyChange = () => setOnly(!only)

  return (
    <div>
      <div>
        <label htmlFor="search">Search </label>
        <input
          id="search"
          value={word}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <label htmlFor="sort">Sort </label>
        <select
          id="sort"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="name">Name</option>
          <option value="state">State</option>
          <option value="likes">Likes</option>
        </select>
      </div>

      <div>
        <label htmlFor="visited">Visited only </label>
        <input
          id="visited"
          type="checkbox"
          checked={only}
          onChange={handleOnlyChange}
        />
      </div>
    </div>
  )
}

// ---- come back to this on Friday

function Card(a){
  const park = a.data
  const [note,setNote] = useState("")   // local note for this card
  return(

    <div>

      <h2>{park.name}</h2>
      <p>state: {park.state}</p>
      <p>type: {park.type}</p>

      <p>{park.text}</p>
      <button onClick={()=>a.like(park.id)}>like</button>
      <span> {park.likes} </span>

      <button onClick={()=>a.visit(park.id)}>
        {park.visited ? "unvisit":"visit"}
      </button>
      <button onClick={()=>a.setFav(park.name)}>
        favorite
      </button>
      <button onClick={()=>a.select(park.id)}>
        details
      </button>
      <div>

        <input
          value={note}
          placeholder="note"
          onChange={(e)=>{
            setNote(e.target.value)
            a.save(park.id,e.target.value)
          }}
        />

      </div>

      {note ? <p>{note}</p> : null}

      <hr/>

    </div>

  )

}



function Info(b){

  return(

    <div>

      <h3>details</h3>

      {!b.current ? <p>nothing selected</p> : null}

      {b.current ?

        <div>
          <p>{b.current.name}</p>
          <p>state: {b.current.state}</p>
          <p> type: {b.current.type}</p>
          <p>{b.current.text}</p>
          <p>feature: {b.current.feature}</p>
          <p>likes: {b.current.likes}</p>
          <p> visited: {b.current.visited ? "yes":"no"}</p>
          <p> note: {b.current.note || "none"    }</p>
        </div>
      : null}

    </div>
  )
}

export default function App(){

  const [parks,setParks] = useState([
    {id:1,name:"Yellowstone",state:"Wyoming",type:"geothermal",feature:"Old Faithful",likes:0,visited:false,note:"",text:"geysers and animals"},
    {id:2,name:"Yosemite",state:"California",type:"mountain",feature:"El Capitan",likes:0,visited:false,note:"",text:"big cliffs and waterfalls"},
    {id:3,name:"Grand Canyon",state:"Arizona",type:"canyon",feature:"Colorado River",likes:0,visited:false,note:"",text:"huge canyon carved by water"},
    {id:4,name:"Zion",state:"Utah",type:"canyon",feature:"sandstone cliffs",likes:0,visited:false,note:"",text:"red cliffs and narrow trails"}
  ])

  const [search,setSearch] = useState("")
  const [sort,setSort] = useState("name")
  const [only,setOnly] = useState(false)

  const [favorite,setFavorite] = useState("")
  const [selected,setSelected] = useState(null)

  const [idea,setIdea] = useState("")
  const [ideas,setIdeas] = useState([])

  function likePark(id){

    setParks(

      parks.map(p=>{
        if(p.id===id){
          return {...p, likes:p.likes+1}
        }
        return p
      })

    )
  }
  function toggleVisit(id){

    setParks(

      parks.map(p=>{
        if(p.id===id){
          return {...p, visited:!p.visited}
        }
        return p
      })

    )

  
  }
  function saveNote(id,val){
    setParks(
      parks.map(p=>{
        if(p.id===id){
          return {...p, note:val}
        }
        return p
      })

    )
  }










  let list = parks.filter(p=>{

    let m =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.state.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())

    let v = only ? p.visited : true // debug

    return m && v

  })


  list.sort((a,b)=>{

    if(sort==="name") return a.name.localeCompare(b.name)
    if(sort==="state") return a.state.localeCompare(b.state)
    if(sort==="likes") return b.likes - a.likes

    return 0
  })

  const visitedCount = parks.filter(p=>p.visited).length
  const selectedPark = parks.find(p=>p.id===selected)

// ask matt abt this part
  return(

    <div>

      <Top
        title="Colin's National Parks tracker"
        desc="MA1!"
        count={visitedCount}
        fav={favorite}
      />


      <Options
        word={search}
        setWord={setSearch}
        sort={sort}
        setSort={setSort}
        only={only}
        setOnly={setOnly}
      />

      <p>showing: {list.length}</p>
      <div>

        {/* list of parks */}
        {list.map(p=>(
          <Card
            key={p.id}
            data={p}
            like={likePark}
            visit={toggleVisit}
            setFav={setFavorite}
            select={setSelected}
            save={saveNote}
          />
        ))}

      </div>

      <Info current={selectedPark} />
      <hr/>
      <h3>more park ideas (work in progress)</h3>

      <p>will add later</p>

      <input
        placeholder="type a park name..."
        value={idea}
        onChange={(e)=>setIdea(e.target.value)}
      />
      <button onClick={()=>{
        if(idea.trim() !== ""){
          setIdeas([...ideas, idea])
          setIdea("")
        }
      }}>
      add idea
      </button>

      <ul>
        {ideas.map((i,idx)=>(
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <hr/>

<h3>experimental park game</h3>
<p>moving parts still work in progress</p>

{(() => {

  const [pts,setPts] = useState(
    parks.map(p=>({
      id:p.id,
      x:Math.random()*380,
      y:Math.random()*180
    }))
  )
  if(!window.__parkSim){
    window.__parkSim = true
    setInterval(()=>{
      setPts(old =>
        old.map(d=>({
          ...d,
          x:(d.x + (Math.random()*40-20)+400)%400,
          y:(d.y + (Math.random()*30-15)+200)%200
        }))
      )
    },1000)
  }
  return(
    <div
      style={{
        position:"relative",
        width:"420px",
        height:"220px",
        border:"2px solid black",
        background:"#e8eefc",
        overflow:"hidden"
      }}
    >

      {pts.map(pt=>{

        const p = parks.find(a=>a.id===pt.id)
        return(
          <div
            key={pt.id}
            onClick={()=>setSelected(pt.id)}
            style={{
              position:"absolute",
              left:pt.x,
              top:pt.y,
              cursor:"pointer",
              fontSize:"18px"
            }}
            title={p.name}
          >
            {p.visited ? "🏜️" : "🏞️"}
          </div>
        )
      })}
    </div>
  )
})()}
    </div>
  )
}
// finish this part for MA2


///
