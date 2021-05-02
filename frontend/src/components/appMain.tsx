import React from 'react';
import FadeIn from 'react-fade-in';

type AppMainProps = {
  children: React.ReactNode;
};
function AppMain(props : AppMainProps) {
  const { children } = props;
  return (
    <FadeIn>
      <main>
        {children}
      </main>
    </FadeIn>
  );
}
export default AppMain;
