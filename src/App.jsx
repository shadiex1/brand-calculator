import React, { Component } from "react";
import styles from "./App.module.scss";
import { NextArrow } from "./svg";
import Carousel from "nuka-carousel";
import Img1 from "./assets/brex-inc-logo-vector.png";
import Img2 from "./assets/Stripe-Logo-png-hd.png";
import Img3 from "./assets/amex.png";
import card from "./assets/card.png";
class App extends Component {
  state = {
    vendor: 0,
    media:0,
    corpSpend: 0,
    teamProject:0 ,
    brands: [
      { multiply: 0.3, img: Img1, name: "brex" },
      { multiply: 2.9, img: Img2, name: "stripe" },
      { multiply: 1.3, img: Img3, name: "amex" },
    ],
    selectedBrand: null,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  setSelectedBrand = (brand) => {
    this.setState({
      selectedBrand: brand,
    });
  };
  render() {
    const { vendor, media, corpSpend, teamProject, selectedBrand } = this.state;
    const total =
      Number(vendor) + Number(media) + Number(corpSpend) + Number(teamProject);
    return (
      <div className={styles.App}>
        <div className={styles.calculator}>
          <h2>Calculate your Rewards</h2>
          <div className={styles.input}>
            <label for="vendor"> Vendor/Bills</label>
            <input
              type="number"
              name="vendor"
              id="vendor"
              placeholder="Enter a number"
              onChange={this.handleChange}
              value={this.state.vendor}
            />
          </div>
          <div className={styles.input}>
            <label for="media"> Media/Ad Spend</label>
            <input
              type="number"
              name="media"
              id="media"
              placeholder="Enter a number"
              onChange={this.handleChange}
              value={this.state.media}
            />
          </div>
          <div className={styles.input}>
            <label for="corpSpend"> Corp.Spend</label>
            <input
              type="number"
              name="corpSpend"
              id="corpSpend"
              placeholder="Enter a number"
              onChange={this.handleChange}
              value={this.state.corpSpend}
            />
          </div>
          <div className={styles.input}>
            <label for="teamProject"> Team Project</label>
            <input
              type="number"
              name="teamProject"
              id="teamProject"
              placeholder="Enter a number"
              onChange={this.handleChange}
              value={this.state.teamProject}
            />
          </div>
        </div>
        {vendor && media && corpSpend && teamProject && (
          <div className={styles.rewards}>
            <div className={styles.compare}>
              <h2>Compare your Rewards</h2>
              <div className={styles.slider}>
                <Carousel
                  wrapAround
                  cellSpacing={5}
                  defaultControlsConfig={{
                    prevButtonClassName: `${styles.prev}`,
                    nextButtonClassName: `${styles.next}`,
                    pagingDotsStyle: {
                      display: "none",
                    },
                  }}
                  slidesToShow="3"
                  renderCenterLeftControls={({ previousSlide }) => (
                    <button className={styles.prev} onClick={previousSlide}>
                      <NextArrow />
                    </button>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <button className={styles.next} onClick={nextSlide}>
                      <NextArrow />{" "}
                    </button>
                  )}
                >
                  {this.state.brands.map((brand, i) => (
                    <div
                      style={
                        selectedBrand && brand.name === selectedBrand.name
                          ? { transform: "" }
                          : null
                      }
                      onClick={() => this.setSelectedBrand(brand)}
                      key={i}
                      className={styles.brandCard}
                    >
                      <img src={brand.img} alt="Logo" />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className={styles.rewards}>
                <img src={card} />
                <div className={styles.total}>
                  {selectedBrand && (
                    <div className={styles.progress}>
                      <span>{selectedBrand.name}</span>
                      <div
                        style={{ width: `${selectedBrand.multiply * 20}%` }}
                        className={styles.progressbar}
                      ></div>{" "}
                      ${total * selectedBrand.multiply}{" "}
                    </div>
                  )}

                  <div className={styles.progress}>
                    <span>Unlimited Rewards</span>
                    <div
                      style={{ width: `${1.1 * 20}%` }}
                      className={styles.progressbar}
                    ></div>{" "}
                    ${total * 1.1}
                  </div>
                  <div className={styles.progress}>
                    <span>Lifetime Rewards</span>
                    <div
                      style={{ width: `${1.2 * 20}%` }}
                      className={styles.progressbar}
                    ></div>{" "}
                    ${total * 1.2}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
