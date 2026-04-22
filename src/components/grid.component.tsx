import React from "react";
import type { IUserProps } from "../types/IUserProps";
import "./styles/grid.component.css";
import { useFetch } from "../hooks/useFetch";
import { USERS_URL } from "../constants";
import { Spinner } from "./Spinner";
import "./styles/spinner.css";
import { Skeleton } from "./Skeleton";
import { throttle } from "../helpers/throattle";

export const GridComponent: React.FC<{ searchTerm: string }> = React.memo(
  ({ searchTerm }) => {
    const { data, loading } = useFetch(USERS_URL, searchTerm);
    const userData: IUserProps[] = (data as IUserProps[]) || [];
    const gridRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const el = gridRef.current;
      if (!el) return;

      const handleScroll = (): void => {
        const totalHeight = el.scrollHeight; // total height of the scrollable content
        const visibleHeight = el.clientHeight; // visible box height (viewport of the div)
        const currentScroll = el.scrollTop; // how far user has scrolled from top

        console.log({
          totalHeight,
          visibleHeight,
          currentScroll,
        });

        // Optional: detect if user reached bottom
        const isAtBottom = currentScroll + visibleHeight >= totalHeight - 10;
        if (isAtBottom) {
          console.log("📦 Reached bottom — load more?");
        }
      };

      const throattledHandleScroll = throttle(handleScroll, 400);
      el.addEventListener("scroll", throattledHandleScroll);

      handleScroll();

      console.log("📊 GridComponent scroll listener attached");

      return () => {
        el.removeEventListener("scroll", throattledHandleScroll);
      };
    }, []);

    return (
      <>
        <div className="grid" ref={gridRef}>
          {loading ? (
            <>
              <Spinner />
              <Skeleton />
            </>
          ) : (
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
          )}
        </div>
      </>
    );
  },
  (
    prevProps: { searchTerm: string },
    nextProps: { searchTerm: string },
  ): boolean => {
    return prevProps.searchTerm === nextProps.searchTerm;
  },
);
