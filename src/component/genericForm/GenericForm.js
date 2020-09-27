import React from "react";

class GenericForm extends React.Component {
    
    static FORM_INPUT = "input";
    static FORM_TEXTAREA = "textarea";
    static FORM_SELECT = "select";
    static FORM_CHECKBOX = "checkbox";
    static FORM_RADIO = "radio";

    constructor(props) {
        super(props);
        
        this.state = {
            inputs: {
                input: this.formInput.bind(this),
                textarea: this.formTextarea.bind(this),
                select: this.formSelect.bind(this),
                checkbox: this.formCheckbox.bind(this),
                radio: this.formRadio.bind(this),
            }
        }
    }

    formInput(input, key){
        return (            
            <div key={key} className={`form-group col-xs-${input.xs || "12"} col-sm-${input.sm || "12"} col-md-${input.md || "12"} col-lg-${input.lg || "12"} col-xl-${input.xl || "12"}`}>
                {input.label && (
                    <label htmlFor={key} style={input.labelStyle}>
                        {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                    </label>
                )}
                <input
                    id={key}
                    list={input.datalist && `datalist-${key}`}
                    required={input.required}
                    disabled={input.disabled}
                    placeholder={input.placeholder}
                    className={`form-control ${input.className}`}
                    style={input.inputStyle}
                    type={input.type || "text"}
                    value={input.value}
                    pattern={input.pattern}
                    title={input.title}
                    onChange={(e) => this.props.onInputChange(e.target.value, key)}
                />
                {input.datalist && input.datalist.length > 0 && (
                    <datalist id={`datalist-${key}`}>
                        {input.datalist.map((d, idx) => (
                            <option key={idx} value={d.value}>{d.label}</option>
                        ))}
                    </datalist> 
                )}   
            </div>
        )
    }

    formTextarea(input, key){
        return (            
            <div key={key} className={`form-group col-xs-${input.xs || "12"} col-sm-${input.sm || "12"} col-md-${input.md || "12"} col-lg-${input.lg || "12"} col-xl-${input.xl || "12"}`}>
                {input.label && (
                    <label htmlFor={key} style={input.labelStyle}>
                        {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                    </label>
                )}
                <textarea
                    id={key}
                    required={input.required}
                    disabled={input.disabled}
                    placeholder={input.placeholder}
                    className={`form-control ${input.className}`}
                    style={input.inputStyle}
                    rows={input.rows}
                    cols={input.cols}
                    maxLength={input.maxLength}
                    value={input.value}
                    onChange={(e) => this.props.onInputChange(e.target.value, key)}
                />
            </div>
        )
    }

    formSelect(input, key){
        return (      
            <div key={key} className={`form-group col-xs-${input.xs || "12"} col-sm-${input.sm || "12"} col-md-${input.md || "12"} col-lg-${input.lg || "12"} col-xl-${input.xl || "12"}`}>
                {input.label && (
                    <label htmlFor={key} style={input.labelStyle}>
                        {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                    </label>
                )}
                <select
                    id={key}
                    required={input.required}
                    disabled={input.disabled}
                    placeholder={input.placeholder}
                    className={`form-control ${input.className}`}
                    style={input.inputStyle}
                    value={input.value}
                    onChange={(e) => this.props.onInputChange(e.target.value, key)}
                >
                    {input.options.map((o, oIdx) => (
                        <option key={oIdx} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
        )
    }

    formCheckbox(input, key) {
        return (
            <div key={key} className={`col-xs-${input.xs || "12"} col-sm-${input.sm || "12"} col-md-${input.md || "12"} col-lg-${input.lg || "12"} col-xl-${input.xl || "12"}`}>
                <div className="form-group form-check">
                    <input 
                        id={key}
                        type="checkbox" 
                        className={`form-check-input ${input.className}`} 
                        style={input.inputStyle}
                        disabled={input.disabled}
                        checked={input.value}
                        onChange={(e) => this.props.onInputChange(!input.value, key)}
                    />
                    <label style={input.labelStyle} className="form-check-label" htmlFor={key}>{input.label}</label>
                </div>
            </div>
        )
    }

    formRadio(input, key){
        return (
            <div key={key} className={`col-xs-${input.xs || "12"} col-sm-${input.sm || "12"} col-md-${input.md || "12"} col-lg-${input.lg || "12"} col-xl-${input.xl || "12"}`}>
                <div className="form-group">
                    {input.label && (
                        <label className="mb-2" style={input.labelStyle}>
                            {input.label}{input.required && <span style={{color:"red"}}>*</span>}
                        </label>
                    )}
                    {input.options.map((option, idx) => (
                        <div key={idx} className="form-check mb-1">
                            <input 
                                key={idx}
                                name={key}
                                id={`${key}-${idx}`}
                                style={input.inputStyle}
                                required={input.required}
                                disabled={input.disabled || option.disabled}
                                type="radio" 
                                className={`form-check-input ${input.className}`}
                                checked={input.value === option.value}
                                onChange={() => this.props.onInputChange(option.value, key)}
                            />
                            <label className="form-check-label" htmlFor={`${key}-${idx}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>  
            </div>
        );
    }

    formInputs(){
        return (
            <div className="row">
                {Object.keys(this.props.form).map((key) => { 
                    let input = this.props.form[key];
                    if(input.hide) return;
                    if(!input.typeInput) return;
                    let inputField = this.state.inputs[input.typeInput];
                    if(inputField) return inputField(input, key);
                })} 
            </div>
        )
    }

    render() {
        if(this.props.onSubmit){
            return (
                <form autoComplete={this.props.autoComplete} onSubmit={this.props.onSubmit}>
                    {this.formInputs()}
                    <div className="row justify-content-center">
                        {this.props.onCancel && (
                            <div className="col-md-6">
                                <button type="button" className="btn btn-block btn-danger" onClick={this.props.onCancel}>
                                    {this.props.cancelButtonContent}
                                </button>
                            </div>
                        )}
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-block btn-primary" disabled={this.props.awaitingSubmit}>
                                {this.props.awaitingSubmit ? (
                                    <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    this.props.submitButtonContent
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            )
        } else return this.formInputs();
    }
}

export default GenericForm;