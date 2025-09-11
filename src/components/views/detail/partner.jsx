// didn't tested
import { useEffect } from "react";
import "./partner.scss";

const webUrl = import.meta.env.VITE_REACT_APP_ROUTER_BASE_NAME;
const testURL = "https://9ece3c32034a.ngrok-free.app";
const env = import.meta.env.VITE_NODE_ENV;

export default function FacebookComments({ id, trailerLink }) {
  let link = env === "development" ? testURL : webUrl + "/partner/" + cinemaKey;
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
      document.body.appendChild(script);
    }

    const checkFB = setInterval(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
        clearInterval(checkFB);
      }
    }, 100);

    return () => {
      // cleanup
      clearInterval(checkFB);
    };
  }, []);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <h4>Beta Cinemas chào đón các đối tác nhượng quyền </h4>
      <div className="partner-container">
        <div className="like-share-container movie-container">
          <div
            className="fb-like"
            data-href={link}
            data-width=""
            data-layout="standard" // standard, button_count, box_count
            data-action="like"
            data-size="small"
            data-share="true"
          ></div>
        </div>
        <div className="partner-info">
          <div>
            <h2>
              <strong>LỊCH SỬ PHÁT TRIỂN</strong>
            </h2>

            <p>
              <img
                alt=""
                src="/update-ho-so-nang-luc-beta-group-2025-pptx-165623-170225-44.png"
              />
            </p>

            <h2>
              <strong>CHUỖI RẠP BETA CINEMAS</strong>
            </h2>

            <p>
              <img
                alt=""
                src="/screenshot-2025-07-10-at-15-47-12-154721-100725-72.png"
              />
            </p>

            <h2>
              <strong>TẠI SAO CHỌN BETA CINEMAS?</strong>
            </h2>

            <p>
              <strong>1. ĐI ĐẦU VÀ LUÔN DẪN ĐẦU</strong>
            </p>
            <p>
              Beta Cinemas là chuỗi rạp chiếu phim{" "}
              <strong>
                <em>dẫn đầu trong phân khúc thị trường trung cấp</em>
              </strong>{" "}
              và là chuỗi rạp đầu tiên hoàn thiện chính sách nhượng quyền thương
              hiệu, tiềm năng phát triển mạnh nhất trong thị trường.
            </p>

            <p>
              <strong>2. ĐỘI NGŨ CHUYÊN NGHIỆP</strong>
            </p>
            <p>
              Mô hình đầu tư và đội ngũ quản lý chuyên nghiệp. Đào tạo nhân sự
              thường xuyên để đảm bảo duy trì chất lượng dịch vụ.
            </p>

            <p>
              <strong>3. CHI PHÍ THẤP, HOÀN VỐN NHANH</strong>
            </p>
            <p>
              Với kinh nghiệm nhiều năm trong đầu tư & vận hành các rạp chiếu
              phim tại Việt Nam, Beta Media luôn đi đầu trong việc sử dụng hiệu
              quả chi phí đầu tư & tối ưu việc vận hành kinh doanh. Thời gian
              hoàn vốn nhanh từ 3 – 5 năm, tỷ suất lợi nhuận cao, ổn định và
              dịch chuyển theo hướng tích cực.
            </p>

            <p>
              <strong>4. SẢN PHẨM ĐA DẠNG</strong>
            </p>
            <p>
              Với 3 mô hình nhượng quyền rạp phim, phù hợp với mong muốn của các
              nhà đầu tư và thị trường.
            </p>

            <p>
              <strong>6. HỖ TRỢ TỐI ĐA</strong>
            </p>
            <p>
              Hỗ trợ truyền thông, nguyên vật liệu, danh mục phim, tư vấn kinh
              doanh, quản lý vận hành,...
            </p>

            <h2>
              <strong>QUYỀN LỢI CỦA ĐỐI TÁC</strong>
            </h2>

            <p>
              <strong>1. QUYỀN SỬ DỤNG THƯƠNG HIỆU</strong>
            </p>
            <p>
              Được sử dụng thương hiệu của Beta Cinemas để mở rạp và quảng cáo
              truyền thông.
            </p>

            <p>
              <strong>2. TƯ VẤN THIẾT KẾ XÂY DỰNG</strong>
            </p>
            <p>
              Hỗ trợ tư vấn thiết kế xây dựng, giám sát thi công xây dựng theo
              đúng tiêu chuẩn của Beta Cinemas đảm bảo hiệu suất đầu tư hiệu
              quả.
            </p>

            <p>
              <strong>3. SẢN PHẨM, NGUYÊN VẬT LIỆU</strong>
            </p>
            <p>
              Sản phẩm thường xuyên được cập nhật và nâng cấp. Nhập nguyên vật
              liệu chính gốc với giá ưu đãi nhất theo chuỗi của Beta Cinemas.
            </p>

            <p>
              <strong>4. CHUYỂN NHƯỢNG MÁY MÓC & CÔNG THỨC CHẾ BIẾN</strong>
            </p>
            <p>
              Được chuyển nhượng toàn bộ hệ thống máy móc thiết bị cùng với công
              thức chế biến.
            </p>

            <p>
              <strong>5. ĐÀO TẠO, QUẢN LÝ NHÂN SỰ</strong>
            </p>
            <p>
              Đào tạo và quản lý nhân sự thường xuyên để đảm bảo duy trì chất
              lượng dịch vụ & tối ưu chi phí hoạt động.
            </p>

            <p>
              <strong>6. NGUỒN PHIM HOLLYWOOD</strong>
            </p>
            <p>
              Nguồn phim được cập nhật liên tục và mới nhất theo danh mục phim
              đang hiện có tại Việt Nam và thế giới. Tỉ lệ chia sẻ được ưu đãi
              theo chuỗi của Beta Cinemas.
            </p>

            <p>
              <strong>7. KHAI THÁC QUẢNG CÁO</strong>
            </p>
            <p>
              Beta Cinemas chịu trách nhiệm khai thác quảng cáo thương mại tại
              rạp đối tác. Doanh thu quảng cáo được hai bên chia sẻ theo từng
              gói hợp đồng cụ thể.
            </p>

            <p>
              <strong>8. HỖ TRỢ TRUYỀN THÔNG</strong>
            </p>
            <p>
              Được hưởng các chương trình truyền thông chung của thương hiệu,
              được tư vấn về PR, marketing, kế hoạch phát triển của rạp.
            </p>

            <h2>
              <strong>CHI PHÍ NHƯỢNG QUYỀN</strong>
            </h2>

            <p>1. NHƯỢNG QUYỀN THƯƠNG HIỆU</p>
            <p>2. TƯ VẤN THIẾT KẾ 2D-3D & SET UP RẠP TIÊU CHUẨN</p>
            <p>3. QUẢNG CÁO TRUYỀN THÔNG</p>
            <p>4. ĐÀO TẠO NHÂN SỰ CHUYÊN NGHIỆP</p>
            <p>5. HỆ THỐNG MÁY MÓC TIÊU CHUẨN QUỐC TẾ</p>
            <p>6. QUẢN LÝ HỆ THỐNG PHẦN MỀM ĐỘC QUYỀN</p>

            <h2>
              <strong>TIỀM LỰC ĐỐI TÁC</strong>
            </h2>

            <p>
              <strong>1. VỊ TRÍ TIỀM NĂNG</strong>
            </p>
            <p>
              Các khu vực thuận tiện giao thông, mật độ dân cư cao (70 ngàn dân
              cư), có trường học, siêu thị xung quanh. Đặc biệt các khu vực
              huyện lỵ tại các thành phố nhỏ đang là địa điểm phù hợp nhất.
            </p>

            <p>
              <strong>2. MẶT BẰNG TỐI ƯU</strong>
            </p>
            <ul>
              <li>Diện tích tối thiểu 350m2 cho tới 2000m2</li>
              <li>Số phòng chiếu từ 2 tới 8 phòng</li>
              <li>Chiều cao thông thủy mặt bằng: 5m</li>
              <li>Thời hạn sử dụng mặt bằng: tối thiểu 5 năm</li>
            </ul>

            <p>
              <strong>3. TÀI CHÍNH</strong>
            </p>
            <ul>
              <li>Beta Cinemas Diamond từ 6 tỉ/phòng chiếu</li>
              <li>Beta Cinemas Platinum từ 5 tỉ/phòng chiếu</li>
              <li>Beta Cinemas Gold từ 4 tỉ/phòng chiếu</li>
            </ul>
            <p>
              Chi phí đã bao gồm phí nhượng quyền và đầu tư xây dựng, trang
              thiết bị để đi vào vận hành kinh doanh.
            </p>

            <h2>
              <strong>QUY TRÌNH THAM GIA</strong>
            </h2>
            <p>
              <img alt="" src="/quytrinh-final-164314-200624-13.png" />
            </p>

            <h2>
              <strong>ĐĂNG KÍ THAM GIA</strong>
            </h2>

            <p>
              Beta Cinemas luôn chào đón các cá nhân, tổ chức có chung định
              hướng phát triển mô hình kinh doanh rạp chiếu phim, hình thành
              phong cách, lối sống văn minh hiện đại.
            </p>

            <p>
              <em>
                <strong>
                  Hãy hợp tác cùng Beta Cinemas để nắm bắt, dẫn đầu xu hướng và
                  đột phá!
                </strong>
              </em>
            </p>

            <p>
              <em>
                <a href="https://betagroup.vn/nhuong-quyen">
                  <strong>
                    LIÊN HỆ ĐỂ NẮM BẮT CƠ HỘI ĐẦU TƯ NGAY HÔM NAY!!!
                  </strong>
                </a>
              </em>
            </p>

            <p>
              <strong>Hotline: 1800 646 420</strong>
            </p>
            <p>
              <strong>Email: franchise@betacinemas.vn</strong>
            </p>
          </div>
        </div>
        <div
          className="fb-comments"
          data-href={link}
          data-width="100%"
          data-numposts="5"
        ></div>
      </div>
    </div>
  );
}
