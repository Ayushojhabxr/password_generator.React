import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [upAllowed, setUpAllowed] = useState(false)
  const [loAllowed, setLoAllowed] = useState(false)
  const [password, setPassword] = useState("")


  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
    if(upAllowed) str+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(loAllowed) str+="abcdefghijklmnopqrstuvwxyz"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword , loAllowed , upAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
    alert("password copied to clipboard")
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator , loAllowed , upAllowed])
  return (
    
    <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-300 hover:shadow-lg'
        >copy</button>
        
    </div>
    <div className='flex flex-col flex-wrap text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e)=>{setLength(e.target.value)} }
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev); // y lga ki agr checked hua to checked mark hoga func m, unchecked hua to unchecked
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={upAllowed}
              id="uppercase"
              onChange={() => {
                  setUpAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="uppercase">Uppercase Letters</label>
      </div>

      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={loAllowed}
              id="lowerrcase"
              onChange={() => {
                  setLoAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="uppercase">Lowercase Letters</label>
      </div>

    </div>
</div>
    
  )
}

export default App