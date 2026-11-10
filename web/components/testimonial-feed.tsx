"use client";

import { useState } from "react";
import type { Testimonial } from "../lib/content";

const PAGE_SIZE = 4;

export function TestimonialFeed({ reviews }: { reviews: Testimonial[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleReviews = reviews.slice(0, visibleCount);
  const remaining = Math.max(0, reviews.length - visibleReviews.length);

  return <>
    <div className="testimonial-feed-status" aria-live="polite">
      Showing {visibleReviews.length} of {reviews.length} reviews
    </div>
    <div className="testimonial-feed-grid">
      {visibleReviews.map((review) => {
        const rating = Math.max(0, Math.min(5, review.rating || 0));
        return <article className="testimonial-card" key={review._id}>
          <div className="testimonial-top">
            <span className="testimonial-stars" aria-label={rating + " out of 5 stars"}>{"★".repeat(rating) + "☆".repeat(5-rating)}</span>
            <span>{review.platform} · {review.reviewDateLabel || review.reviewDate}</span>
          </div>
          <blockquote>“{review.quote}”</blockquote>
          <div className="testimonial-bottom">
            <div>
              <strong>{review.reviewerLabel || "Client review"}</strong>
              <span>{review.reviewerCountry || (review.reviewerHandle ? "@" + review.reviewerHandle : "Client feedback")}{review.repeatClient ? " · Repeat client" : ""}</span>
            </div>
            {review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noreferrer">{review.sourceLabel || "View source"} ↗</a> : <span className="testimonial-source-note">Shared client feedback</span>}
          </div>
        </article>;
      })}
    </div>
    {remaining > 0 && <div className="testimonial-load-more">
      <button type="button" className="button button-outline" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, reviews.length))}>
        Load more reviews <span>({remaining} remaining)</span>
      </button>
    </div>}
  </>;
}
