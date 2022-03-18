import './checkboxes.css';

const Checkboxes = (props: any) => (
    <div className="filter-checkboxes-div">
        <h3>Legend</h3>
        <nav id="filter-group" className="filter-group">
        <input onChange={props.toggleVisibility} name="community" type="checkbox" id="poi-theatre" defaultChecked></input>
        <label htmlFor='poi-theatre'>Community</label>
        <input onChange={props.toggleVisibility} name="research" type="checkbox" id="poi-rocket" defaultChecked></input>
        <label htmlFor='poi-rocket'>Research</label>
        <input onChange={props.toggleVisibility} name="government" type="checkbox" id="poi-museum" defaultChecked></input>
        <label htmlFor='poi-museum'>Government</label>
        </nav>
    </div>
);

export default Checkboxes;
