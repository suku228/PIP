
export const Skeleton = () => {
  return (
    <>
        <div className="card-grid skeleton-card-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="card" key={i}>
              <div className="card-header"></div>
              <div className="card-body">
                <div className="card-field">
                  <span className="field-label">Username:</span>
                </div>
                <div className="card-field">
                  <span className="field-label">Email:</span>
                </div>
                <div className="card-field">
                  <span className="field-label">Phone:</span>
                </div>
                <div className="card-field">
                  <span className="field-label">Website:</span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  );
};
