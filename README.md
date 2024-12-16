# Google Search

This project is a web application built using React and Next.js. It includes features such as image search, voice search, and a typeahead search bar. The application is designed to provide a seamless search experience with various input methods.

## Components

### Search Bar
- **File**: `components/search-bar.tsx`
- **Key Features**:
  - Typeahead suggestions from `sampleKeywords`.
  - Integration with voice and image search modals.

### Search Dropdown
- **File**: `components/search-dropdown.tsx`
- **Key Features**:
  - Handles click events outside the dropdown to close it.
  - Displays different icons based on the type of search item (trending, person, media).

### Image Search Modal
- **File**: `components/image-search-modal.tsx`
- **Key Features**:
  - Drag-and-drop functionality for image files.
  - Input field for pasting image URLs.
  - Transition effects for user interactions.

### Input Component
- **File**: `components/ui/input.tsx`
- **Key Features**:
  - Customizable through props.
  - Styled for consistency with the application's design.

### Sample Keywords
- **File**: `components/sampleKeywords.ts`
- **Key Features**:
  - Provides a static list of keywords for demonstration purposes.
  - Can be expanded or modified to include more relevant terms.

<img width="1440" alt="Screenshot 2024-12-16 at 10 36 27 PM" src="https://github.com/user-attachments/assets/7f2a3b9c-6804-4622-b29e-48ba3e4ed0b2" />


<img width="1440" alt="Screenshot 2024-12-16 at 10 36 45 PM" src="https://github.com/user-attachments/assets/3ecc4eb2-c26f-48ac-898c-b245404154e9" />
