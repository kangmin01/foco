import React, { useEffect, useState } from 'react';

const useInfiniteScroll = () => {
  const [page, setPage] = useState(1);
  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight + 300 >=
      document.documentElement.scrollHeight
    ) {
      setPage((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  return page;
};

export default useInfiniteScroll;
