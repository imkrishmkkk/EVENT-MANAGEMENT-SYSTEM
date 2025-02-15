const Card = ({ children, style }) => {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          ...style,
        }}
      >
        {children}
      </div>
    )
  }
  
  export default Card
  
  