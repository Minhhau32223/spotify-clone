# Hướng dẫn cài đặt và chạy Frontend (React + Vite) cho Spotify Clone

Thư mục này chứa mã nguồn và hướng dẫn liên quan đến phần frontend của ứng dụng Spotify Clone, được xây dựng bằng React và Vite.

## Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các phần mềm sau trên hệ thống của mình:

* **Node.js** (phiên bản LTS được khuyến nghị): Bạn có thể tải xuống từ [https://nodejs.org/](https://nodejs.org/). npm (Node Package Manager) được cài đặt cùng với Node.js.
* **npm** (Node Package Manager) hoặc **yarn** (một trình quản lý gói khác): Nếu bạn thích yarn, bạn có thể cài đặt nó trên toàn cục bằng lệnh `npm install --global yarn`.

## Các bước cài đặt

1.  **Điều hướng đến thư mục dự án frontend:**

    Mở terminal hoặc command prompt và điều hướng đến thư mục `frontend/spotify-clone-react` (giả sử đây là vị trí dự án React của bạn trong thư mục gốc của Spotify Clone).

    ```bash
    cd spotify_clone/spotify_clone
    ```

2.  **Cài đặt các gói JavaScript:**

    Bước này tải xuống và cài đặt tất cả các thư viện và gói cần thiết mà ứng dụng React phụ thuộc vào. Bạn có thể sử dụng `npm` hoặc `yarn`.

    **Sử dụng npm:**

    ```bash
    npm install
    ```

    **Sử dụng yarn:**

    ```bash
    yarn install
    ```

    Quá trình này có thể mất vài phút tùy thuộc vào kết nối internet và hệ thống của bạn.

## Chạy Vite Development Server

Sau khi các dependencies được cài đặt, bạn có thể khởi động Vite development server. Server này sẽ xây dựng ứng dụng của bạn và phục vụ nó trong trình duyệt web, thường với tính năng hot-reloading (nghĩa là các thay đổi bạn thực hiện trong mã sẽ tự động cập nhật trong trình duyệt).

```bash
npm run dev
# Hoặc
yarn dev