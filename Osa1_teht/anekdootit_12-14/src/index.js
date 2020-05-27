import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Toimii välikätenä buttonin ja handlereiden kanssa
const Button = ({ click, text }) => (
  <button onClick={click}>
    {text}
  </button>
)

//Näyttää anekdootin jolla on eniten ääniä ja sen äänimäärän
const MostVoted = ({ allVotes, mostVotes }) => {
  return (
    <div>
      <p>{anecdotes[mostVotes]}</p>
      <Voted vote={allVotes} select={mostVotes} />
    </div>
  )
}

//Näyttää anekdootin äänien määrän
const Voted = ({ vote, select }) => {
  return (
    <div>
      <p> has {vote[select]} votes</p>
    </div>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)

  //Ääni taulukko
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  //Eniten ääniä saanut anekdootti maxVotes = kuinka paljon ääniä mostVoted => valitun anekdootin sijainti
  const [maxVotes, setMax] = useState(0)
  const [mostVoted, setMost] = useState(-1)

  //Generoi uuden random numeron ja tarkastaa onko tämän hetkinen valitun anekdootin paikan numero sama kuin generoidun uuden numeron
  //jos on generoidaan uusi numero => Ei tule peräkkäisiä anekdootteja
  const Randomize = () => {
    let numRandom = Math.floor(Math.random() * (anecdotes.length))

    while (numRandom === selected) {
      numRandom = Math.floor(Math.random() * (anecdotes.length))
    }

    setSelected(numRandom)
  }

  //Tekee taulukosta kopion ja lisätään siihen valitun alkion kohdalle 1 tarkastaa samalla eniten ääniä saaneen anekdootin
  const handleAdd = () => {
    const copy = [...votes]
    copy[selected] += 1
    
    if (copy[selected] > maxVotes) {
      setMost(selected)
      setMax(copy[selected])
    }

    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Voted vote={votes} select={selected} />
      <Button click={handleAdd} text='vote' />
      <Button click={Randomize} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVoted allVotes={votes} mostVotes={mostVoted} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
      <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

