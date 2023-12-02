interface ComponentProps {
  children: React.ReactNode;
}
const Container: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className="xl:px-20 sm:px-2 md:px-10 px-4 mx-auto max-w-[2520px]">
      {children}
    </div>
  );
};

export default Container;
