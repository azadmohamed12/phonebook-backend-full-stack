export default function NameInput({ numberValue, nameValue, onNameChange, onNumberChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={onNameChange} placeholder="put your Name" />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} placeholder="put your Number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
