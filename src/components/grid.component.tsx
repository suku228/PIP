import React from "react";
import type { IUserProps } from "../types/IUserProps";
import "./styles/grid.component.css";
import { useFetch } from "../hooks/useFetch";
import { USERS_URL } from "../constants";
import { Spinner } from "./Spinner";
import "./styles/spinner.css";
import { Skeleton } from "./Skeleton";

export const GridComponent: React.FC<{ searchTerm: string }> = ({
  searchTerm,
}) => {
  const { data, loading } = useFetch(USERS_URL, searchTerm);
  const userData: IUserProps[] = (data as IUserProps[]) || [];

  return (
    <>
      {loading ? (
        <>
        <Spinner />
        <Skeleton />
        </>
      ) : (
        <div className="grid">
          <div className="card-grid">
            {userData.map((user) => (
              <div key={user.id} className="card">
                <div className="card-header">
                  <h3 className="card-title">{user.name}</h3>
                </div>
                <div className="card-body">
                  <div className="card-field">
                    <span className="field-label">Username:</span>
                    <span className="field-value">{user.username}</span>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Email:</span>
                    <span className="field-value">{user.email}</span>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Phone:</span>
                    <span className="field-value">{user.phone}</span>
                  </div>
                  <div className="card-field">
                    <span className="field-label">Website:</span>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="field-link"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
