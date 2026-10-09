export default function GlintDivider({ className = "", style = {} }){
  return (
    <div className={`glint-divider ${className}`} aria-hidden="true" style={style}>
      <div className="glint-divider__line">
        <span className="glint-divider__glint" />
      </div>
    </div>
  )
}
