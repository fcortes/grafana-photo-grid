import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { PhotoGridOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';

interface Props extends PanelProps<PhotoGridOptions> {}

export const PhotoGridPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const styles = getStyles();

  if (data.series.length === 0 || data.series[0].fields.length === 0) {
    return <h1>._.</h1>;
  }

  // Assume img urls are in the first column
  const urls = data.series[0].fields[0].values as unknown as string[];

  const otherFields = data.series[0].fields.slice(1).map((f) => f.name);

  // All other fields will be shown as additional data in a hover tooltip
  console.log(data);
  const extraData = Object.fromEntries(
    urls.map((u: string, i: number) => [
      u,
      Object.fromEntries(
        otherFields.map((f: string, j: number) => [f, (data.series[0].fields[j + 1].values as any).buffer[i]])
      ),
    ])
  );

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          display: grid;
          grid-template-columns: repeat(${options.columns}, minmax(0, 1fr));
          gap: 10px;
          overflow-y: scroll;
          overflow-x: hidden;
        `
      )}
    >
      {urls.map((url: string) => (
        <div
          key={url}
          className={cx(
            styles.wrapper,
            css`
              background-image: url(${url});
              background-size: cover;
              background-position: center;
              height: 100%;
              min-height: ${options.minHeight}px;
            `
          )}
          onMouseEnter={() => setCurrentUrl(url)}
          onMouseLeave={() => setCurrentUrl(null)}
        >
          {currentUrl === url && (
            <div
              className={cx(
                styles.wrapper,
                css`
                  background-color: rgba(0, 0, 0, 0.5);
                  height: 100%;
                  padding-left: 10px;
                  color: white;
                `
              )}
            >
              <ul>
                {Object.entries(extraData[url]).map(([k, v]) => (
                  <li
                    key={k}
                    className={cx(
                      styles.wrapper,
                      css`
                        list-style: none;
                      `
                    )}
                  >
                    {k}: {v}
                  </li>
                ))}
              </ul>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={cx(
                  styles.wrapper,
                  css`
                    color: white;
                    font-weight: bold;
                  `
                )}
              >
                {options.goToLinkText}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
