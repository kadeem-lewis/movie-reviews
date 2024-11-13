## 11-13-2024

### Fixed

- Rendering <a> as a descendant of <a> due to rendering react-router-dom Link inside a Bootstrap Nav.Link component in Navbar
- Rendering list without unique key prop in ratings and movies components
- Functions defined outside of useEffect hook being used inside useEffect without being added to the dependency array
- Functions in useEffect dependency array not being wrapped in useCallback

### Changed

- replaced axios calls with fetch api in react frontend
- Changed movieDataService from a class to a file containing functions
- api caller functions to try/catch and async/await instead of .then/.catch

## 11-12-2024

### Added

- typescript support to react frontend
- typescript support for express backend
- tsx for compiling ts code in backend
- tsup to bundle and build typescript backend
- eslint and typescript eslint for linting typescript code
- added prettier for code formatting

### Changed

- react packages to latest version
- react component extensions from .js to .tsx
- react frontend bundler from create-react-app to vite

### Other

- Enabled Strict Mode for React
