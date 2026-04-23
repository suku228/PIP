import React, { useEffect, useRef, useCallback } from "react";
import type { IUserProps } from "../types/IUserProps";
import "./styles/grid.component.css";
import { useFetch } from "../hooks/useFetch";
import { USERS_URL } from "../constants";
import { Spinner } from "./Spinner";
import "./styles/spinner.css";
import { Skeleton } from "./Skeleton";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const GridComponent: React.FC<{ searchTerm: string }> = React.memo(
  ({ searchTerm }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const [pageOffset, setPageOffset] = React.useState<number>(0);
    const { data, loading } = useFetch(USERS_URL, searchTerm, pageOffset);
    const userData: IUserProps[] = (data as IUserProps[]) || [];

    useEffect(() => {
      setPageOffset(0);
    }, [searchTerm]);

    const handleIntersection = useCallback(
      (entries: IntersectionObserverEntry[]): void => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && userData.length > 0) {
          console.log("Load more triggered");
          setPageOffset((prev) => prev + 1);
        }
      },
      [loading, userData.length],
    );

    useIntersectionObserver(loadMoreRef, handleIntersection, {
      root: gridRef,
      rootMargin: "0px",
      threshold: 1.0,
    });

    return (
      <div className="grid" ref={gridRef}>
        {loading && pageOffset === 0 ? (
          <>
            <Spinner />
            <Skeleton />
          </>
        ) : (
          <div className="card-grid">
            {userData.map((user, index) => (
              <div key={index} className="card">
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

            <div ref={loadMoreRef} className="load-more-sentinel" />

            {loading && pageOffset > 0 && <Spinner />}
          </div>
        )}
      </div>
    );
  },
  (
    prevProps: { searchTerm: string },
    nextProps: { searchTerm: string },
  ): boolean => {
    return prevProps.searchTerm === nextProps.searchTerm;
  },
);