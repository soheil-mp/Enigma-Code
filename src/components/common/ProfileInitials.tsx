import { FC } from 'react';

interface ProfileInitialsProps {
  name?: string;
  className?: string;
}

const ProfileInitials: FC<ProfileInitialsProps> = ({ name = 'User', className = '' }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`
        flex items-center justify-center 
        rounded-full bg-indigo-600 
        text-white font-medium
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default ProfileInitials; 