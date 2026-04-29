import { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { getSuccessStories } from '../services/contentService';

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    getSuccessStories().then(setStories);
  }, []);

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Success stories"
        title="Lives changed, families completed."
        description="Warm stories from adopters who opened their homes and found more love than they expected."
      />

      <div className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
        {stories.map((story) => (
          <div key={story.story_id} className="mb-6 break-inside-avoid">
            <SuccessStoryCard story={story} onSelect={setSelectedStory} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button type="button" className="btn-primary">Share Your Story</button>
      </div>

      {selectedStory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[32px] bg-white p-6 shadow-2xl">
            <img src={selectedStory.image} alt={selectedStory.petName} className="h-80 w-full rounded-[28px] object-cover" />
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">{selectedStory.date}</p>
                <h2 className="mt-2 text-3xl font-black text-brand-navy">{selectedStory.title}</h2>
              </div>
              <button type="button" className="btn-secondary !px-4 !py-2" onClick={() => setSelectedStory(null)}>
                Close
              </button>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600">{selectedStory.fullText}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
