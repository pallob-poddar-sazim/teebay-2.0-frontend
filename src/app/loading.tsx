const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full size-20 border-8 border-t-transparent border-primary"></div>
    </div>
  );
};

export default Loading;
